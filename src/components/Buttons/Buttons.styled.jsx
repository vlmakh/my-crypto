import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const BtnAdd = styled.button`
  color: ${p => (p.saved ? p.theme.colors.accent : p.theme.colors.text)};
  width: 60px;
  height: 60px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  :hover {
    color: ${p => p.theme.colors.accent};
  }
`;

export const BackLinkBtn = styled(NavLink)`
  display: inline-grid;
  place-items: center;
  padding: 4px 8px;
  color: ${p => p.theme.colors.text};
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  height: 60px;
  transition: color 250ms ease-in;

  :hover,
  :focus {
    color: ${p => p.theme.colors.accent};
  }
`;

export const Button = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  cursor: pointer;

  transition: color 250ms ease-in;

  :hover {
    color: ${p => p.theme.colors.accent};
  }
`;

export const ButtonLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border: none;
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  color: ${p => p.theme.colors.text};
  cursor: pointer;

  transition: color 250ms ease-in;

  :hover {
    color: ${p => p.theme.colors.accent};
  }
`;
