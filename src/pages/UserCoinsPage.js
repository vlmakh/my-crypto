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
import { userWatchList, searchCoin } from 'utils/api';
import { useEffect, useState } from 'react';
import { priceFormat } from 'utils/priceFormat';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { useLocation, Navigate } from 'react-router-dom';
import {
  SearchForm,
  SearchInput,
  SearchBtn,
  ClearBtn,
} from 'components/Search/Search.styled';
import { IoIosCloseCircle } from 'react-icons/io';

export default function UserCoinsPage() {
  const { user, watchlist } = useContext(UserData);
  const [list, setList] = useState([]);
  const location = useLocation();
  const [searchList, setSearchList] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    userWatchList(watchlist)
      .then(data => {
        setList(data);

        document.title = `My Crypto | Watchlist`;
      })
      .catch(error => {});
  }, [watchlist]);

  const onSearchInput = event => {
    setInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!input || input.trim().length <= 2) {
      return;
    }

    searchCoin(input)
      .then(data => setSearchList(data.coins))
      .catch(error => console.log(error.message));
  };

  const clearAll = () => {
    setInput('');
    setSearchList([]);
  };

  return (
    <Box>
      {!user.uid && <Navigate to="/" />}

      <Box mt={5} textAlign="center">
        <List>
          {list &&
            list
              .sort(
                (a, b) =>
                  (a.market_cap_rank ?? a.coingecko_rank) -
                  (b.market_cap_rank ?? b.coingecko_rank)
              )
              .map(coin => (
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

                    <Rank>{coin.market_cap_rank ?? coin.coingecko_rank}</Rank>
                  </Item>
                </CoinLink>
              ))}
        </List>
      </Box>

      <SearchForm onSubmit={handleSubmit}>
        <Box position="relative" flexGrow="1">
          <SearchInput
            type="text"
            value={input}
            onChange={onSearchInput}
            placeholder="coin name or symbol"
          />
          <ClearBtn type="button" onClick={clearAll}>
            <IoIosCloseCircle size="20" />
          </ClearBtn>
        </Box>
        <SearchBtn type="submit">Search</SearchBtn>
      </SearchForm>

      <List>
        {searchList &&
          searchList.map(coin => (
            <CoinLink
              to={`/${coin.id}`}
              state={{ from: location }}
              key={coin.id}
            >
              <Item>
                <img src={coin.large} alt={coin.name} width="50" height="50" />

                <Box ml={5} textAlign="left" width="160px">
                  <Symbol>{coin.symbol}</Symbol>
                  <Name>{coin.name}</Name>
                </Box>

                <Rank>{coin.market_cap_rank}</Rank>
              </Item>
            </CoinLink>
          ))}
      </List>
    </Box>
  );
}
