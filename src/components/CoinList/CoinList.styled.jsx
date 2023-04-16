import styled from '@emotion/styled';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
  width: 480px;
  margin: 0 auto;
  padding: 16px 0;
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
  margin-left: auto;
  margin-right: 24px;
`;

export const Percentage = styled.p`
  /* margin-left: auto; */
  width: 60px;
  text-align: right;
  color: ${p => (p.profit >= 0 ? "green" : "red")}
`;
