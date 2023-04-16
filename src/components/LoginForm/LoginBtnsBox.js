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
import { RegisterForm } from './RegisterForm';

export const LoginBtnsBox = ({ toggleSideBar }) => {
  const { setUser } = useContext(UserData);
  const [btnBox, setBtnBox] = useState(true);
  const [emailForm, setEmailForm] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);

  const handleLogin = () => {
    setEmailForm(!emailForm);
    setBtnBox(!btnBox);
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

  const handleRegisterForm = () => {
    setRegisterForm(!registerForm);
    setBtnBox(!btnBox);
  };

  return (
    <>
      {btnBox && (
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

      {emailForm && (
        <LoginEmailForm
          handleLogin={handleLogin}
          toggleSideBar={toggleSideBar}
        />
      )}

      {registerForm && (
        <RegisterForm
          handleRegisterForm={handleRegisterForm}
          toggleSideBar={toggleSideBar}
        />
      )}
    </>
  );
};
