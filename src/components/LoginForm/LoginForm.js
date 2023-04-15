// import { Box } from 'components/Box/Box';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledErrorMsg,
  Label,
  Button,
} from './LoginForm.styled';
import { login } from 'utils/loginOperations';
import { useContext } from 'react';
import { UserData } from 'utils/context';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm = ({ setShowSideBar }) => {
  const { setUser } = useContext(UserData);

  const handleLogin = (values, { resetForm }) => {
    login(values)
      .then(data =>
        setUser({
          email: data.email,
          token: data.accessToken,
          id: data.uid,
        })
      )
      .finally(() => {
        resetForm();
        setShowSideBar('110%');
      });
  };

  const handleLoginGoogle = () => {
    // loginGoogle();

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        setUser({
          email: user.email,
          token: token,
          name: user.displayName,
          id: user.uid,
        });
      })
      .catch(error => console.log(error.code, error.message))
      .finally(() => {
        setShowSideBar('110%');
      });
  };

  const handleLoginFacebook = () => {
    console.log('login Facebook');
  };

  const handleLoginPhone = () => {
    console.log('login Phone');
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Label htmlFor="email">
          <span>email</span>
          <StyledField name="email" type="text" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="email" />
        </Label>

        <Label htmlFor="password">
          <span>password </span>
          <StyledField
            name="password"
            type="password"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="password" />
        </Label>

        <Button type="submit">Login</Button>
        <Button type="button" onClick={handleLoginGoogle}>
          Login with Google
        </Button>

        <Button type="button" onClick={handleLoginFacebook}>
          Login with Facebook
        </Button>

        <Button type="button" onClick={handleLoginPhone}>
          Login with phone number
        </Button>
      </StyledForm>
    </Formik>
  );
};
