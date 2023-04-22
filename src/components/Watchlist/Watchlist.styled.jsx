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
    font-size: 12px;
    font-weight: 500;
    border: 1px solid darkgrey;
    text-align: center;
  }

  td:first-of-type {
    width: 50px;
  }

  /*
  td:nth-of-type(2) {
    text-align: right;
    padding-right: 60px;
  } */
`;
