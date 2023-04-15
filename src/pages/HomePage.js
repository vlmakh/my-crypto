import { Box } from 'components/Box/Box';
import { List, Item, Name, Price } from 'components/CoinList/CoinList.styled';
import { coinList } from 'utils/api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginationStyled } from 'components/Pagination/Pagination';

export const HomePage = () => {
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useSearchParams();
  const currentPage = Number(searchQuery.get('page'))
    ? Number(searchQuery.get('page'))
    : 1;

  console.log(totalPages);

  useEffect(() => {
    coinList(currentPage)
      .then(data => {
        setList(data);
        setTotalPages(10);
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
          <Item key={coin.id}>
            <img src={coin.image} alt={coin.name} width="60" />

            <Name>{coin.name}</Name>
            <Price>{coin.current_price}</Price>

            <p>{coin.price_change_percentage_24h.toFixed(2)}%</p>
          </Item>
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
