import { Formik } from 'formik';
import * as yup from 'yup';
import {
  StyledForm,
  StyledField,
  StyledErrorMsg,
  Label,
  Button,
} from './LoginForm.styled';
import { useState, useContext } from 'react';
import { UserData } from 'utils/context';
import { IoArrowBack } from 'react-icons/io5';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { Box } from 'components/Box/Box';

let schema = yup.object().shape({
  otp: yup.string().length(6).required(),
});

export const LoginPhoneForm = ({ handleLoginPhone, toggleSideBar }) => {
  const { setUser } = useContext(UserData);
  const [OTP, setOTP] = useState('');

  const generateRecapcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: response => {},
      },
      auth
    );
  };

  const requestOTP = values => {
    generateRecapcha();

    const phoneNumber = values.phone;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.log('SMS not sent', error.message);
      });
  };

  const confirmOTP = (values, { resetForm }) => {
    setOTP(values.otp);

    const confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(OTP)
      .then(result => {
        const user = result.user;

        setUser({
          phone: user.phoneNumber,
          token: user.refreshToken,
          uid: user.uid,
        });
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        resetForm();
        toggleSideBar();
      });
  };

  return (
    <Box>
      <Formik
        onSubmit={requestOTP}
        initialValues={{
          phone: '',
        }}
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
              autoComplete="off"
            ></StyledField>
            <StyledErrorMsg component="div" name="phone" />
          </Label>

          <Button type="submit" id="sign-in-button">
            Send code
          </Button>
        </StyledForm>
      </Formik>

      <Formik
        onSubmit={confirmOTP}
        initialValues={{
          otp: '',
        }}
        validationSchema={schema}
      >
        <StyledForm>
          <Label htmlFor="otp">
            <StyledField
              name="otp"
              type="text"
              placeholder="XXXXXX"
              autoComplete="off"
            ></StyledField>
            <StyledErrorMsg component="div" name="otp" />
          </Label>

          <Button type="submit">Login</Button>
        </StyledForm>
      </Formik>
    </Box>
  );
};
