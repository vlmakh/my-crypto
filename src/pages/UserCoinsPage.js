import { Box } from 'components/Box/Box';
import {
  List,
  CoinLink,
  Item,
  Name,
  Symbol,
  Rank,
  Price,
} from 'components/CoinList/CoinList.styled';
import { userWatchList } from 'utils/api';
import { useEffect, useState } from 'react';
import { priceFormat } from 'utils/priceFormat';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { useLocation, Navigate } from 'react-router-dom';

export default function UserCoinsPage() {
  const { user, watchlist } = useContext(UserData);
  const [list, setList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    userWatchList(watchlist)
      .then(data => {
        setList(data);

        document.title = `My Crypto | Watchlist`;
      })
      .catch(error => {});
  }, [watchlist]);

  return (
    <>
      {!user.uid && <Navigate to="/" />}

      <Box mt={5} textAlign="center">
        <List>
          {list &&
            list.map(coin => (
              <CoinLink
                to={`/${coin.id}`}
                state={{ from: location }}
                key={coin.id}
              >
                <Item>
                  <img
                    src={coin.image.small}
                    alt={coin.name}
                    width="50"
                    height="50"
                  />

                  <Box ml={5} textAlign="left" width="160px">
                    <Symbol>{coin.symbol}</Symbol>
                    <Name>{coin.name}</Name>
                  </Box>

                  <Price>
                    {priceFormat(coin.market_data.current_price.usd)}
                  </Price>

                  <Rank>{coin.market_cap_rank}</Rank>
                </Item>
              </CoinLink>
            ))}
        </List>
      </Box>
    </>
  );
}
