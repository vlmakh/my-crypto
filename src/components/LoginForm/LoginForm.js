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
} from './LoginForm.styled';
import { login, loginGoogle, loginFacebook } from 'utils/loginOperations';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUserAdd,
} from 'react-icons/hi';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm = ({ toggleSideBar }) => {
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
        toggleSideBar();
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
        toggleSideBar();
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
        toggleSideBar();
      });
  };

  const handleLoginPhone = () => {
    console.log('login Phone');
  };

  const handleRegister = () => {
    console.log('Register');
  };

  return (
    <>
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

          <Button type="submit">
            <HiOutlineMail size="20" />
            Login with email
          </Button>

          <ButtonGoogle type="button" onClick={handleLoginGoogle}>
            <FcGoogle size="20" />
            Login with Google
          </ButtonGoogle>

          <ButtonFB type="button" onClick={handleLoginFacebook}>
            <BsFacebook size="20" />
            Login with Facebook
          </ButtonFB>

          <Button type="button" onClick={handleLoginPhone}>
            <HiOutlinePhone size="20" />
            Login with phone number
          </Button>

          <Button type="button" onClick={handleRegister}>
            <HiOutlineUserAdd size="20" />
            Register
          </Button>
        </StyledForm>
      </Formik>
    </>
  );
};
