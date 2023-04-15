import styled from '@emotion/styled';
import ReactPaginate from 'react-paginate';

export const PaginationStyled = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  justify-content: center;
  margin-top: 16px;
  font-size: 16px;

  @media and screen and (max-width: 479.98px) {
    flex-wrap: wrap;
  }

  & li {
    color: ${p => p.theme.colors.textPrimary};

    transition: color 250ms linear;

    :hover:not(.disabled) {
      color: ${p => p.theme.colors.accent};
    }
  }

  & .activePage {
    color: ${p => p.theme.colors.accent};
  }

  & a {
    padding: 0 8px;
    cursor: pointer;
  }

  & a.disabled {
    cursor: default;
  }
`;
