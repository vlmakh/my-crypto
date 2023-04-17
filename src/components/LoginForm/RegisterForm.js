import { Formik } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledErrorMsg,
  Label,
  Button,
} from './LoginForm.styled';
import { register } from 'utils/loginOperations';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { IoArrowBack } from 'react-icons/io5';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const RegisterForm = ({ handleRegisterForm, toggleSideBar }) => {
  const { setUser } = useContext(UserData);

  const handleRegister = (values, { resetForm }) => {
    register(values)
      .then(data =>
        setUser({
          email: data.email,
          token: data.accessToken,
          uid: data.uid,
        })
      )
      .finally(() => {
        resetForm();
        toggleSideBar();
      });
  };

  return (
    <Formik
      onSubmit={handleRegister}
      initialValues={{
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Button type="button" onClick={handleRegisterForm}>
          <IoArrowBack size="20" />
          Back
        </Button>

        <Label htmlFor="email">
          <StyledField
            name="email"
            type="email"
            placeholder="email"
          ></StyledField>
          <StyledErrorMsg component="div" name="email" />
        </Label>

        <Label htmlFor="name">
          <StyledField name="name" type="text" placeholder="Name"></StyledField>
          <StyledErrorMsg component="div" name="name" />
        </Label>

        <Label htmlFor="password">
          <StyledField
            name="password"
            type="password"
            placeholder="password"
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="password" />
        </Label>

        <Label htmlFor="passwordConfirm">
          <StyledField
            name="passwordConfirm"
            type="password"
            placeholder="password repeat"
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="passwordConfirm" />
        </Label>

        <Button type="submit">Register</Button>
      </StyledForm>
    </Formik>
  );
};
