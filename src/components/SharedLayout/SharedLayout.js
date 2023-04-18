import { Outlet } from 'react-router-dom';
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
import { useState, Suspense } from 'react';
import { LoginBtnsBox } from 'components/LoginForm/LoginBtnsBox';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { logout } from 'utils/loginOperations';
import { Button, ButtonLink } from 'components/Buttons/Buttons.styled';

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
          <ButtonLink to="/">Home</ButtonLink>
          {user.uid ? (
            <UserMenu>
              <p>{user.name || user.email || user.phone} </p>
              <ButtonLink to="/user">Watchlist</ButtonLink>
              <Button onClick={handleLogout}>Logout</Button>
            </UserMenu>
          ) : (
            <>
              <Button onClick={toggleSideBar}>{sideBarBtn}</Button>
            </>
          )}
        </Nav>
      </Header>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>

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
