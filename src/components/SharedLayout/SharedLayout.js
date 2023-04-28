import { Outlet } from 'react-router-dom';
import {
  Layout,
  Header,
  Nav,
  Footer,
  MyLink,
  SideBar,
  UserMenu,
  LogoImg,
  LogoText,
} from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';
import { useState, Suspense } from 'react';
import { LoginBtnsBox } from 'components/LoginForm/LoginBtnsBox';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { logout } from 'utils/loginOperations';
import { Button, ButtonLink } from 'components/Buttons/Buttons.styled';
import { Box } from 'components/Box/Box';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { logo } from 'images';

export const SharedLayout = () => {
  const { user, setUser } = useContext(UserData);
  const [showSideBar, setShowSideBar] = useState({
    transform: '110%',
    button: 'Login',
    visibility: 'hidden',
  });

  const toggleSideBar = () => {
    if (showSideBar.transform === 0) {
      setShowSideBar({
        transform: '110%',
        button: 'Login',
        visibility: 'hidden',
      });
    } else {
      setShowSideBar({ transform: 0, button: 'Close', visibility: 'visible' });
    }
  };

  const handleLogout = () => {
    logout().then(() => setUser({}));
  };

  return (
    <Layout>
      <Header>
        <Nav>
          <ButtonLink to="/">
            <img src={logo} alt="logo" width="24" />{' '}
            <LogoText>My Crypto</LogoText>
          </ButtonLink>
          {user.uid ? (
            <UserMenu>
              <p>{user.name || user.email || user.phone} </p>
              <ButtonLink to="/watchlist">Watchlist</ButtonLink>
              <Button onClick={handleLogout}>Logout</Button>
            </UserMenu>
          ) : (
            <>
              <Button onClick={toggleSideBar}>{showSideBar.button}</Button>
            </>
          )}
        </Nav>
      </Header>

      <Suspense
        fallback={
          <Box pt={5} width="100vw" display="flex" justifyContent="center">
            <LoadingSpinner />
          </Box>
        }
      >
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
        <LogoImg src={logo} alt="logo" width="240" />
        <LoginBtnsBox toggleSideBar={toggleSideBar} />
      </SideBar>
    </Layout>
  );
};
