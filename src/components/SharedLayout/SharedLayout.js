import { Outlet, Link } from 'react-router-dom';
import { Layout, Header, Nav, Footer, MyLink } from './SharedLayout.styled';
import { LogoVM } from 'components/LogoVM/LogoVM';

export const SharedLayout = () => {
  return (
    <Layout>
      <Header>
        <Nav>
          <Link to="/">Home</Link>
          {/* <Link to="/login">Login/Register</Link> */}
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
    </Layout>
  );
};
