import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
const firebase_config = require('../conf.json')['firebase_conf'];
const app = initializeApp(firebase_config);
const auth = getAuth(app);

const email_signup = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(email, password);
    const user = res.user;
    if (user) {
      alert(
        'Account Successfully Created.\nVerify your email to complete the sign-u process.'
      );
      // user.sendEmailVerification();
    }
  } catch (error) {
    switch (error.message) {
      case 'Firebase: Error (auth/email-already-in-use).':
        alert('E-mail already in use!');
        break;
    }
  }
};

const email_signin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, username, password);
    console.log(res); // add alert for success // add ui functionalities on successful login
  } catch (error) {
    console.log(error); // add alert for error
  }
};

const signout = () => signOut(auth);

export { email_signup };
