import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updateEmail,
} from 'firebase/auth';
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { auth, handleError, pid_record_id } from './firebase';

const db = getFirestore();
const conf = require('../../conf.json');

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
      isAdmin: conf['admin_list'].includes(panther_id),
      pantherId: panther_id,
      name: member[0].fields['Name'],
    });

    if (user) {
      updateProfile(user, {
        displayName: member[0].fields['Name'],
        phoneNumber: member[0].fields['Phone Number'],
      });
      sendEmailVerification(user);
      signout();
      return {
        message:
          'Account Successfully Created. Click the verification link sent to your email to complete the sign-up process.',
      };
    }
  } catch (error) {
    return handleError(error);
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
    return handleError(error);
  }
};

const signout = async () => {
  await signOut(auth);
  return false;
};

const update_email = async (email, panther_id) => {
  const member = await pid_record_id(panther_id);
  const user = auth.currentUser;
  if (email != user.email) {
    await updateEmail(user, email)
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      canModifyEquipment: conf['can_modify_equipment'].includes(panther_id),
      isEboard: member[0].fields['Executive Board'].length > 0,
      isAdmin: conf['admin_list'].includes(panther_id),
      pantherId: panther_id,
      name: member[0].fields['Name'],
    });
  }
};

export { email_signup, email_signin, signout, update_email };
