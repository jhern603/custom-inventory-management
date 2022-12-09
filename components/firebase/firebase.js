import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const conf = require('../../conf.json');
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

export { getdoc, handleError, pid_record_id, auth };
