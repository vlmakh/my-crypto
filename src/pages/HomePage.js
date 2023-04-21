import { Box } from 'components/Box/Box';
import {
  List,
  CoinLink,
  Item,
  Name,
  Symbol,
  Rank,
  Price,
  Percentage,
} from 'components/CoinList/CoinList.styled';
import { coinList } from 'utils/api';
import { useEffect, useState, useContext } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { PaginationStyled } from 'components/Pagination/Pagination';
import { priceFormat } from 'utils/priceFormat';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { UserData } from 'utils/context';

export const HomePage = () => {
  const { isLoading, setIsLoading } = useContext(UserData);
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPage = Number(searchQuery.get('page'))
    ? Number(searchQuery.get('page'))
    : 1;
  const location = useLocation();
  // const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    coinList(currentPage, controller.signal)
      .then(data => {
        setList(data);
        setTotalPages(100);
        document.title = `My Crypto`;
      })
      .catch(error => setIsError(error.message))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [currentPage, setIsLoading]);

  const handlePageClick = e => {
    setSearchQuery({ page: e.selected + 1 });
  };

  return (
    <Box mt={5} textAlign="center">
      {isError && <h2>{isError}</h2>}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <List>
          {list.map(coin => (
            <CoinLink
              to={`/${coin.id}`}
              state={{ from: location }}
              key={coin.id}
            >
              <Item>
                <img src={coin.image} alt={coin.name} width="60" height="60" />

                <Box ml={5} textAlign="left" width="160px">
                  <Symbol>{coin.symbol}</Symbol>
                  <Name>{coin.name}</Name>
                </Box>

                <Price>{priceFormat(coin.current_price)}</Price>
                <Percentage profit={coin.price_change_percentage_24h}>
                  {(+coin.price_change_percentage_24h).toFixed(2)}%
                </Percentage>
                <Rank>{coin.market_cap_rank}</Rank>
              </Item>
            </CoinLink>
          ))}
        </List>
      )}

      {totalPages > 1 && (
        <PaginationStyled
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="<"
          disabledLinkClassName="disabled"
          activeClassName="activePage"
          forcePage={currentPage - 1}
        />
      )}
    </Box>
  );
};
