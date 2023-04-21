import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';

export const SearchForm = styled(Form)`
  display: flex;
  margin: 0 auto;
  max-width: 400px;
`;

export const SearchInput = styled(Field)`
  width: 100%;
  padding: 4px 8px;

  &:hover + button {
    color: grey;
  }
`;

export const ClearBtn = styled.button`
  position: absolute;
  padding: 0 4px;
  top: 4px;
  right: 0;
  border: none;
  color: transparent;
  background-color: transparent;

  cursor: pointer;

  transition: color 250ms linear;

  :hover {
    color: grey;
  }
`;

export const Label = styled.label`
  position: relative;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
`;

export const StyledErrorMsg = styled(ErrorMessage)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translatey(100%);
  font-size: 10px;
  background-color: transparent;
  color: #212121;
`;
