import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
const firebase_config = require('../conf.json')['firebase_conf'];
const app = initializeApp(firebase_config);
const auth = getAuth(app);

const email_signup = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (user) {
      sendEmailVerification(user);
      signout();
      return {
        message:
          'Account Successfully Created. Click the verification link sent to your email to complete the sign-up process.',
      };
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return { message: 'You have entered an invalid email.' };
      case 'auth/email-already-in-use':
        return { message: 'E-mail already in use!' };
    }
  }
};

const email_signin = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    if (user.emailVerified) return user;
    else {
      signout();
      return {
        message:
          'You have not verified your email yet!\nPlease click on the link sent to your email first before attempting to log in.',
      };
    }
  } catch (error) {
    switch (error.code) {
      case 'auth/invalid-email':
        return { message: 'You have entered an invalid email.' };
      case 'auth/user-disabled':
        return { message: 'Your account is disabled.' };
      case 'auth/wrong-password':
        return { message: 'You have entered an incorrect password.' };
      case 'auth/user-not-found':
        return { message: 'E-Mail not found.' };
      default:
        return {
          message:
            'An unexpected error has occurred. Please make sure you have entered your credentials correctly, or try again later.',
        };
    }
  }
};

const signout = () => signOut(auth);

export { email_signup, email_signin };
