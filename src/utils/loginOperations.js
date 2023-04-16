import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

export const register = async credentials => {
  try {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    ).then(userCredential => {
      const { email, accessToken, uid } = userCredential.user;
      return { email, accessToken, uid };
    });
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const loginEmail = async credentials => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const { email, accessToken, uid } = response.user;
    return { email, accessToken, uid };
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    const credential = GoogleAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;

    return { user, token };
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const loginFacebook = async () => {
  try {
    const provider = new FacebookAuthProvider();

    const response = await signInWithPopup(auth, provider);
    const user = response.user;
    const credential = FacebookAuthProvider.credentialFromResult(response);
    const token = credential.accessToken;

    return { user, token };
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const loginPhone = async () => {
  try {
    console.log('Login phone');
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error.code, error.message);
  }
};
