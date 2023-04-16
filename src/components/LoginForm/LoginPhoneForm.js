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
import { IoArrowBack } from 'react-icons/io5';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../utils/firebase';

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginPhoneForm = ({ handleLoginPhone, toggleSideBar }) => {
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

  // const handleLoginPhone = () => {
  //   console.log('login Phone');
  //   toggleSideBar();
  // };

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
        <Button type="button" onClick={handleLoginPhone}>
          <IoArrowBack size="20" />
          Back
        </Button>

        <Label htmlFor="email">
          <StyledField
            name="phone"
            type="text"
            placeholder="+380 XX XXX-XXXX"
          ></StyledField>
          <StyledErrorMsg component="div" name="phone" />
        </Label>

        <Button type="button" id="sign-in-button">
          Send code
        </Button>

        <Label htmlFor="otp">
          <StyledField
            name="otp"
            type="text"
            placeholder="XXXXXX"
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
