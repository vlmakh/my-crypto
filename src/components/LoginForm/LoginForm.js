// import { Box } from 'components/Box/Box';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledErrorMsg,
  Label,
  Button,
  ButtonGoogle,
  ButtonFB,
  ButtonLogin,
} from './LoginForm.styled';
import { login, loginGoogle, loginFacebook } from 'utils/loginOperations';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { BsFacebook, BsFillTelephoneFill } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';

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
    loginGoogle()
      .then(({ user, token }) =>
        setUser({
          email: user.email,
          token,
          name: user.displayName,
          id: user.uid,
        })
      )
      .finally(() => {
        setShowSideBar('110%');
      });
  };

  const handleLoginFacebook = async () => {
    loginFacebook()
      .then(({ user, token }) =>
        setUser({
          email: user.email,
          token,
          name: user.displayName,
          id: user.uid,
        })
      )
      .finally(() => {
        setShowSideBar('110%');
      });
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

        <ButtonLogin type="submit">Login</ButtonLogin>

        <ButtonGoogle type="button" onClick={handleLoginGoogle}>
          <FcGoogle size="20" />
          Login with Google
        </ButtonGoogle>

        <ButtonFB type="button" onClick={handleLoginFacebook}>
          <BsFacebook size="20" />
          Login with Facebook
        </ButtonFB>

        <Button type="button" onClick={handleLoginPhone}>
          <BsFillTelephoneFill size="20" />
          Login with phone number
        </Button>
      </StyledForm>
    </Formik>
  );
};
