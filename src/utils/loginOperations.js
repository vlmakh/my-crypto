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

    signInWithPopup(auth, provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user);
      // const { email, accessToken, displayName } = user._delegate;
      return user;
    });
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
