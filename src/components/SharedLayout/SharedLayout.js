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
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { logout } from 'utils/loginOperations';

export const SharedLayout = () => {
  const { user, setUser } = useContext(UserData);
  const [showSideBar, setShowSideBar] = useState('110%');

  const toggleSideBar = () => {
    if (showSideBar === 0) setShowSideBar('110%');
    else {
      setShowSideBar(0);
    }
  };

  const handleLogout = () => {
    logout().then(() => setUser({ isLogin: false }));
  };

  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          {user.isLogin ? (
            <>
              <p>Hello, {user.email} </p>{' '}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={toggleSideBar}>Login</button>
          )}
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
        <LoginForm setShowSideBar={setShowSideBar} />
      </SideBar>
    </Layout>
  );
};
