import { Outlet, Link } from 'react-router-dom';
import {
  Layout,
  Header,
  Nav,
  Footer,
  MyLink,
  SideBar,
  UserMenu,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { useState } from 'react';
import { LoginBtnsBox } from 'components/LoginForm/LoginBtnsBox';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { logout } from 'utils/loginOperations';

export const SharedLayout = () => {
  const { user, setUser } = useContext(UserData);
  const [showSideBar, setShowSideBar] = useState('110%');
  const [sideBarBtn, setSideBarBtn] = useState('Login');

  const toggleSideBar = () => {
    if (showSideBar === 0) {
      setShowSideBar('110%');
      setSideBarBtn('Login');
    } else {
      setShowSideBar(0);
      setSideBarBtn('Close');
    }
  };

  const handleLogout = () => {
    logout().then(() => setUser({}));
  };

  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          {user.uid ? (
            <UserMenu>
              <p>{user.name} </p>
              <Link to="/">My coins</Link>
              <button onClick={handleLogout}>Logout</button>
            </UserMenu>
          ) : (
            <>
              <button onClick={toggleSideBar}>{sideBarBtn}</button>
            </>
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
        <LoginBtnsBox toggleSideBar={toggleSideBar} />
      </SideBar>
    </Layout>
  );
};
