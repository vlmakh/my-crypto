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
import { IoArrowBack } from 'react-icons/io5';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginEmailForm = ({ handleLogin, toggleSideBar }) => {
  const { setUser } = useContext(UserData);

  const handleLoginEmail = (values, { resetForm }) => {
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

  return (
    <Formik
      onSubmit={handleLoginEmail}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Button type="button" onClick={handleLogin}>
          <IoArrowBack size="20" />
          Back
        </Button>

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
      </StyledForm>
    </Formik>
  );
};
