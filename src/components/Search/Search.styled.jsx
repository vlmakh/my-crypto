import styled from '@emotion/styled';

export const SearchForm = styled.form`
  display: flex;
  margin: 0 auto;
  max-width: 400px;
`;

export const SearchInput = styled.input`
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

export const SearchBtn = styled.button`
  font-weight: 700;
  padding: 4px 8px;
  color: ${p => p.theme.colors.textSecondary};
  
  cursor: pointer;

  transition: color 250ms linear;

  :hover {
    color: ${p => p.theme.colors.accent};
  }
`;
