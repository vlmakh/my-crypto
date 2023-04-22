import styled from '@emotion/styled';

export const WatchTable = styled.table`
  margin: 16px auto;
  background-color: white;

  th {
    text-transform: uppercase;
    background-color: darkcyan;
    color: #fff;
  }

  td {
    width: 100px;
    font-size: 14px;
    border: 1px solid darkgrey;
    text-align: center;
  }

  td:first-of-type {
    width: 50px;
  }
`;
