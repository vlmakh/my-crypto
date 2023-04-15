import { Outlet, Link } from 'react-router-dom';
import {
  Layout,
  Header,
  Nav,
  Footer,
  MyLink,
  SideBar,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { useState } from 'react';
import { LoginForm } from 'components/LoginForm/LoginForm';

export const SharedLayout = () => {
  const [showSideBar, setShowSideBar] = useState('110%');

  const toggleSideBar = () => {
    if (showSideBar === 0) setShowSideBar('110%');
    else {
      setShowSideBar(0);
    }
  };

  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          <button onClick={toggleSideBar}>Login</button>
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
      <SideBar show={showSideBar}>
        <LoginForm />
      </SideBar>
    </Layout>
  );
};
