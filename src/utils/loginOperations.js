import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export const register = async (email, password) => {
  try {
    createUserWithEmailAndPassword(auth, email, password).then(
      userCredential => {
        // Signed in
        const { email, accessToken } = userCredential.user;
        // ...
        return { email, accessToken };
      }
    );
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
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
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};
