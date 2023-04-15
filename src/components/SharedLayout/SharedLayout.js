import { Outlet, Link } from 'react-router-dom';
import {
  Layout,
  Header,
  Nav,
  Footer,
  MyLink,
  LoginBar,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { useState } from 'react';
import { LoginForm } from 'components/LoginForm/LoginForm';

export const SharedLayout = () => {
  const [showLoginBar, setShowLoginBar] = useState('100%');

  const toggleLoginBar = () => {
    if (showLoginBar === 0) setShowLoginBar('100%');
    else {
      setShowLoginBar(0);
    }
  };

  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          <button onClick={toggleLoginBar}>Login</button>
        </Nav>
      </Header>
      <Outlet />
      <Footer>
        <MyLink href="https://vlmakh.github.io/my-portfolio/" target="blank">
          <LogoVM />
        </MyLink>
        <p>2023</p>
        <MyLink href="mailto:vlmakh@gmail.com">vlmakh@gmail.com</MyLink>
      </Footer>
      <LoginBar show={showLoginBar}>
        <LoginForm />
      </LoginBar>
    </Layout>
  );
};
