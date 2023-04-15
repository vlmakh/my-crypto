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

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm = () => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  const handleLoginGoogle = () => {
    console.log('login Google');
  };

  const handleLoginFacebook = () => {
    console.log('login Facebook');
  };

  const handleLoginPhone = () => {
    console.log('login Phone');
  };

  return (
    <Formik
      onSubmit={handleSubmit}
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
