import { BtnsBox, Button, ButtonGoogle, ButtonFB } from './LoginForm.styled';
import { loginGoogle, loginFacebook } from 'utils/loginOperations';
import { useContext, useState } from 'react';
import { UserData } from 'utils/context';
import { BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUserAdd,
} from 'react-icons/hi';
import { LoginEmailForm } from './LoginEmailForm';
import { LoginPhoneForm } from './LoginPhoneForm';
import { RegisterForm } from './RegisterForm';

export const LoginBtnsBox = ({ toggleSideBar }) => {
  const { setUser } = useContext(UserData);
  const [showBtnBox, setShowBtnBox] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = () => {
    setShowEmailForm(!showEmailForm);
    setShowBtnBox(!showBtnBox);
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
    setShowPhoneForm(!showPhoneForm);
    setShowBtnBox(!showBtnBox);
  };

  const handleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowBtnBox(!showBtnBox);
  };

  return (
    <>
      {showBtnBox && (
        <BtnsBox>
          <Button type="button" onClick={handleLogin}>
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

          <Button type="button" onClick={handleRegisterForm}>
            <HiOutlineUserAdd size="20" />
            Register
          </Button>
        </BtnsBox>
      )}

      {showEmailForm && (
        <LoginEmailForm
          handleLogin={handleLogin}
          toggleSideBar={toggleSideBar}
        />
      )}

      {showRegisterForm && (
        <RegisterForm
          handleRegisterForm={handleRegisterForm}
          toggleSideBar={toggleSideBar}
        />
      )}

      {showPhoneForm && (
        <LoginPhoneForm
          handleLoginPhone={handleLoginPhone}
          toggleSideBar={toggleSideBar}
        />
      )}
    </>
  );
};
