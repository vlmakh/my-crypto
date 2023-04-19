import styled from '@emotion/styled';
import { Form, Field, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-around;

  width: 360px;
`;

export const BtnsBox = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-around;

  width: 360px;
`;

export const StyledField = styled(Field)`
  width: 100%;
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
  display: flex;
  gap: 24px;
  cursor: pointer;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  margin: 0 auto;
  color: ${p => p.theme.colors.text};
  box-shadow: 0 2px 2px grey;

  transition: background-color 250ms ease-in, color 250ms ease-in;

  :hover {
    background-color: ${p => p.theme.colors.accent};
    color: #FFFFFF;
  }

  :active {
    box-shadow: inset 0 2px 2px grey;
  }

  :focus-visible {
    outline: none;
  }
`;

export const ButtonGoogle = styled(Button)`
  background-color: white;
`;

export const ButtonFB = styled(Button)`
  background-color: #4267B2;
  color: white;
`;
