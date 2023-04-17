import { Box } from 'components/Box/Box';
import {
  List,
  CoinLink,
  Item,
  Name,
  Symbol,
  Price,
  Percentage,
} from 'components/CoinList/CoinList.styled';
import { coinList } from 'utils/api';
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { PaginationStyled } from 'components/Pagination/Pagination';
import { priceFormat } from 'utils/priceFormat';

export const HomePage = () => {
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPage = Number(searchQuery.get('page'))
    ? Number(searchQuery.get('page'))
    : 1;
  const location = useLocation();

  useEffect(() => {
    coinList(currentPage)
      .then(data => {
        setList(data);
        setTotalPages(100);
        document.title = `My Crypto`;
      })
      .catch(error => {});
  }, [currentPage]);

  const handlePageClick = e => {
    setSearchQuery({ page: e.selected + 1 });
  };

  // const handleSearch = () => {
  //   return list.filter(
  //     coin =>
  //       coin.name.toLowerCase().includes('') ||
  //       coin.symbol.toLowerCase().includes('')
  //   );
  // };

  return (
    <Box mt={5} textAlign="center">
      <List>
        {list.map(coin => (
          <CoinLink to={`/${coin.id}`} state={{ from: location }} key={coin.id}>
            <Item>
              <img src={coin.image} alt={coin.name} width="60" height="60" />

              <Box ml={5} textAlign="left">
                <Symbol>{coin.symbol}</Symbol>
                <Name>{coin.name}</Name>
              </Box>

              <Price>{priceFormat(coin.current_price)}</Price>
              <Percentage profit={coin.price_change_percentage_24h}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </Percentage>
            </Item>
          </CoinLink>
        ))}
      </List>

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
