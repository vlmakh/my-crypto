import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  width: 540px;
  margin: 16px auto;
`;

export const CoinLink = styled(NavLink)`
  text-decoration: none;
  color: #212121;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid grey;
`;

export const Name = styled.p``;

export const Symbol = styled.p`
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
`;

export const Price = styled.p`
  width: 100px;
  margin-left: auto;
  text-align: right;
  font-weight: 700;
`;

export const Percentage = styled.p`
  width: 60px;
  margin-left: 16px;
  text-align: right;
  font-size: 12px;
  font-weight: 700;
  color: ${p => (p.profit >= 0 ? 'green' : 'red')};
`;

export const Rank = styled.p`
  width: 32px;
  margin-left: 16px;
  text-align: right;
  font-size: 12px;
`;
