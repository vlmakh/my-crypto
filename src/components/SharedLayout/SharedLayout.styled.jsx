import styled from '@emotion/styled';

export const Layout = styled.div`
  position: relative;
  overflow: hidden;

  display: grid;
  grid-template-rows: 1fr auto auto;
  min-height: 100vh;
  padding-top: ${p => p.theme.space[1]}px;
  background-color: ${p => p.theme.colors.bcgMain};
`;

export const Header = styled.div`
  border-bottom: 1px solid grey;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: ${p => p.theme.space[5]}px;
  padding: 0 16px;
  background-color: ${p => p.theme.colors.bcgMain};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: ${p => p.theme.space[4]}px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${p => p.theme.space[4]}px;
  border-top: 1px solid grey;
  width: 100%;
  height: 36px;
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.colors.main};
  z-index: 100;
`;

export const MyLink = styled.a`
  color: ${p => p.theme.colors.text};
  font-size: ${p => p.theme.fontSizes.s};
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;

  transition: color 250ms linear;

  :hover,
  :focus {
    color: ${p => p.theme.colors.accent};
  }
`;

export const SideBar = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  padding-top: 16px;
  height: calc(100% - 68px);

  background-color: white;
  box-shadow: -4px 0 8px -4px rgba(0, 0, 0, 0.6);

  transform: translateX(${p => p.show.transform});
  visibility: ${p => p.show.visibility};

  transition: transform 300ms ease-in, visibility 300ms ease-in;
`;

export const UserMenu = styled.div`
  display: flex;
  gap: 16px;
`;

export const LogoImg = styled.img`
  margin: 0 auto 16px;
`;

export const LogoText = styled.span`
  @media screen and (max-width: 479.98px) {
    display: none;
  }
`;
