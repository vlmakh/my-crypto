import { Formik } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledErrorMsg,
  Label,
  Button,
} from './LoginForm.styled';
import { useContext } from 'react';
import { UserData } from 'utils/context';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../utils/firebase';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginPhoneForm = ({ toggleSideBar }) => {
  const { setUser } = useContext(UserData);

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: response => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      auth
    );
  };

  const requestOTP = () => {
    generateRecapcha();

    const phoneNumber = '+380006666666';
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch(error => {
        // Error; SMS not sent
        // ...
      });
  };

  const handleLoginPhone = () => {
    console.log('login Phone');
  };

  return (
    <Formik
      onSubmit={handleLoginPhone}
      initialValues={{
        phone: '',
        otp: '',
      }}
      validationSchema={schema}
    >
      <StyledForm>
        <Label htmlFor="email">
          <span>phone</span>
          <StyledField name="phone" type="text" placeholder=" "></StyledField>
          <StyledErrorMsg component="div" name="phone" />
        </Label>

        <Label htmlFor="otp">
          <span>otp </span>
          <StyledField
            name="otp"
            type="text"
            placeholder=" "
            autoComplete="off"
          ></StyledField>
          <StyledErrorMsg component="div" name="otp" />
        </Label>

        <Button type="button" id="sign-in-button" onClick={handleLoginPhone}>
          Login with phone number
        </Button>
      </StyledForm>
    </Formik>
  );
};
