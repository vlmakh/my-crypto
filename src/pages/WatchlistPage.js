import { Box } from 'components/Box/Box';
import {
  List,
  CoinLink,
  Item,
  Name,
  Symbol,
} from 'components/CoinList/CoinList.styled';
import {
  WatchTable,
  Percentage,
  Rank,
} from 'components/Watchlist/Watchlist.styled';
import { userWatchList, searchCoin } from 'utils/api';
import { useEffect, useState } from 'react';
import { formatPrice } from 'utils/formatPrice';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { useLocation, Navigate } from 'react-router-dom';
import {
  SearchForm,
  SearchInput,
  ClearBtn,
  Label,
  StyledErrorMsg,
} from 'components/Search/Search.styled';
import { Button } from 'components/Buttons/Buttons.styled';
import { IoIosCloseCircle } from 'react-icons/io';
import { Formik } from 'formik';
import * as yup from 'yup';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';

let schema = yup.object().shape({
  coin: yup
    .string()
    .min(3, 'Search musthave minimum 3 symbols')
    .required("Search can't be empty"),
});

export default function UserCoinsPage() {
  const { user, watchlist } = useContext(UserData);
  const [list, setList] = useState([]);
  const location = useLocation();
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    userWatchList(watchlist, controller.signal)
      .then(data => {
        setList(data);

        document.title = `My Crypto | Watchlist`;
      })
      .catch(error => setIsError('Network error'))
      .finally(() => setIsLoading(false));
    return () => {
      controller.abort();
    };
  }, [setIsLoading, watchlist]);

  const handleSubmit = values => {
    searchCoin(values.coin)
      .then(data => setSearchList(data.coins))
      .catch(error => console.log(error.message));
  };

  const handleReset = () => {
    setSearchList([]);
  };

  return (
    <Box>
      {!user.uid && <Navigate to="/" />}

      <Box mt={5} textAlign="center">
        {isError && <h2>{isError}</h2>}

        {isLoading && <LoadingSpinner />}
      </Box>

      <WatchTable>
        <thead>
          <tr>
            <th></th>
            <th></th>

            <th>Price, $</th>
            <th>change 24h</th>
            <th>Price, BTC</th>
            <th>change 24h</th>
            <th>rank</th>
          </tr>
        </thead>

        <tbody>
          {list[0] &&
            list
              .sort(
                (a, b) =>
                  (a.market_cap_rank ?? a.coingecko_rank) -
                  (b.market_cap_rank ?? b.coingecko_rank)
              )
              .map(coin => {
                return (
                  <tr key={coin.id}>
                    <td>
                      <CoinLink to={`/${coin.id}`} state={{ from: location }}>
                        <img
                          src={coin.image.small}
                          alt={coin.name}
                          width="50"
                          height="50"
                        />
                      </CoinLink>
                    </td>
                    <td>
                      <CoinLink to={`/${coin.id}`} state={{ from: location }}>
                        <Box ml={2} textAlign="left" width="160px">
                          <Symbol>{coin.symbol}</Symbol>
                          <Name>{coin.name}</Name>
                        </Box>
                      </CoinLink>
                    </td>

                    <td>
                      <b>{formatPrice(coin.market_data.current_price.usd)}</b>
                    </td>
                    <td>
                      <Percentage
                        profit={coin.market_data.price_change_percentage_24h}
                      >
                        {(
                          coin.market_data.price_change_percentage_24h ?? 0
                        ).toFixed(1)}
                        %
                      </Percentage>
                    </td>

                    <td>
                      <b>{coin.market_data.current_price.btc.toFixed(8)}</b>
                    </td>
                    <td>
                      <Percentage
                        profit={
                          coin.market_data
                            .price_change_percentage_24h_in_currency.btc
                        }
                      >
                        {(
                          coin.market_data
                            .price_change_percentage_24h_in_currency.btc ?? 0
                        ).toFixed(1)}
                        %
                      </Percentage>
                    </td>
                    <td>
                      <Rank>{coin.market_cap_rank ?? coin.coingecko_rank}</Rank>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </WatchTable>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          coin: '',
        }}
        validationSchema={schema}
      >
        <SearchForm>
          <Button type="submit">Search</Button>

          <Box flexGrow="1">
            <Label htmlFor="coin">
              <SearchInput
                name="coin"
                type="text"
                placeholder="by coin name or symbol"
                autoComplete="off"
              />
              <ClearBtn type="reset" onClick={handleReset}>
                <IoIosCloseCircle size="20" />
              </ClearBtn>
              <StyledErrorMsg component="div" name="coin" />
            </Label>
          </Box>
        </SearchForm>
      </Formik>

      <List>
        {searchList.length > 0 &&
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
