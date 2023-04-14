import { Box } from 'components/Box/Box';
import { List, Item } from 'components/Base/Base.styled';
import { coinList } from 'utils/api';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    coinList()
      .then(data => {
        setList(data);
        // setTotalPages(data.total_pages);
      })
      .catch(error => {});
  }, []);

  return (
    <Box mt={5} textAlign="center">
      HOME PAGE
      <List>
        {list.map(coin => (
          <Item key={coin.id}>
            <img src={coin.image} alt={coin.name} width="60" />
            <p>{coin.name}</p>
            <p>{coin.current_price}</p>
          </Item>
        ))}
      </List>
    </Box>
  );
};
