import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const BtnAdd = styled.button`
  color: ${p => (p.saved ? "yellow" : "#212121")};
  width: 60px;
  height: 60px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
export const BackLinkBtn = styled(NavLink)`
  display: inline-block;
  padding: 4px 8px;
  color: ${p => p.theme.colors.text};
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
height: 60px;
  transition: color 250ms ease-in;

  :hover, :focus {
    color: ${p => p.theme.colors.accent};
  }
`;
