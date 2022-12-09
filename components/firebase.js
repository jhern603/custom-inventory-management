import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const conf = require('../conf.json');
const app = initializeApp(conf['firebase_conf']);
const auth = getAuth(app);
const db = getFirestore(app);

const pid_record_id = (panther_id) => {
  const airtable = require('airtable');
  const base = new airtable({
    apiKey: conf.api_key,
    endpointUrl: 'https://api.airtable.com',
  }).base(conf.base_id);

  return new Promise((resolve, reject) => {
    base(conf.members_table_id)
      .select({
        view: 'Grid view',
        filterByFormula: `({Panther ID} = \'${panther_id}\')`,
      })
      .firstPage((err, res) => {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(res);
      });
  });
};

const email_signup = async (email, password, panther_id) => {
  try {
    const member = await pid_record_id(panther_id);
    if (!member[0]) {
      throw { code: 'Panther ID not found.' };
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      canModifyEquipment: conf['can_modify_equipment'].includes(panther_id),
      isEboard: member[0].fields['Executive Board'].length > 0,
      pantherId: panther_id,
      name: member[0].fields['Name'],
    });

    if (user) {
      sendEmailVerification(user);
      signout();
      return {
        message:
          'Account Successfully Created. Click the verification link sent to your email to complete the sign-up process.',
      };
    }
  } catch (error) {
    handleError(error);
  }
};

const email_signin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    if (user.emailVerified) {
      return user;
    } else {
      signout();
      return {
        message:
          'You have not verified your email yet!\nPlease click on the link sent to your email first before attempting to log in.',
      };
    }
  } catch (error) {
    handleError(error);
  }
};

const signout = async () => {
  await signOut(auth);
  return false;
};

const getdoc = async (email) => {
  const q = query(collection(db, 'users'), where('email', '==', email));
  return await getDocs(q);
};

const handleError = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return { message: 'You have entered an invalid email.' };
    case 'auth/user-disabled':
      return { message: 'Your account is disabled.' };
    case 'auth/wrong-password':
      return { message: 'You have entered an incorrect password.' };
    case 'auth/user-not-found':
      return { message: 'E-Mail not found.' };
    case 'auth/invalid-email':
      return { message: 'You have entered an invalid email.' };
    case 'auth/email-already-in-use':
      return { message: 'E-mail already in use!' };
    case 'Panther ID not found.':
      return { message: 'You have entered an invalid Panther ID!' };
    default:
      return {
        message:
          'An unexpected error has occurred. Please make sure you have entered your credentials correctly, or try again later.',
      };
  }
};

export { email_signup, email_signin, signout, getdoc, auth };
