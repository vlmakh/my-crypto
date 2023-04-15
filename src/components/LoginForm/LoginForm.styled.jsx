import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';


export const StyledForm = styled(Form)`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-around;

  width: 400px;
`;

export const StyledField = styled(Field)`
  padding: 4px 8px;  
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

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  transition: background-color 250ms linear;

  :hover {
    background-color: ${(p) => p.theme.colors.accent};
  }

  :focus-visible {
    outline: none;
  }
`;