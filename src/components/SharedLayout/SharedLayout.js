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
import { Box } from 'components/Box/Box';
import { BallTriangle } from 'react-loader-spinner';

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
          <ButtonLink to="/">MyCrypto</ButtonLink>
          {user.uid ? (
            <UserMenu>
              <p>{user.name || user.email || user.phone} </p>
              <ButtonLink to="/watchlist">Watchlist</ButtonLink>
              <Button onClick={handleLogout}>Logout</Button>
            </UserMenu>
          ) : (
            <>
              <Button onClick={toggleSideBar}>{sideBarBtn}</Button>
            </>
          )}
        </Nav>
      </Header>

      <Suspense
        fallback={
          <Box pt={5} width="100vw" display="flex" justifyContent="center">
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="#4fa94d"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
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
        <LoginBtnsBox toggleSideBar={toggleSideBar} />
      </SideBar>
    </Layout>
  );
};
