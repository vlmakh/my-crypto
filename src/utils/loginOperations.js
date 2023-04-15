import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
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
      const { email, accessToken } = userCredential.user;
      return { email, accessToken };
    });
  } catch (error) {
    console.log(error.code, error.message);
  }
};

export const login = async credentials => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const { email, accessToken } = response.user;
    return { email, accessToken };
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

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error.code, error.message);
  }
};
