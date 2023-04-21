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
import { userWatchList, searchCoin } from 'utils/api';
import { useEffect, useState } from 'react';
import { formatPrice } from 'utils/formatPrice';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { useLocation, Navigate } from 'react-router-dom';
import {
  SearchForm,
  SearchInput,
  SearchBtn,
  ClearBtn,
  Label,
  StyledErrorMsg,
} from 'components/Search/Search.styled';
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
  }, [watchlist]);

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
                      {formatPrice(coin.market_data.current_price.usd)}
                    </Price>

                    <Percentage
                      profit={coin.market_data.price_change_percentage_24h}
                    >
                      {(+coin.market_data.price_change_percentage_24h).toFixed(
                        2
                      )}
                      %
                    </Percentage>

                    <Rank>{coin.market_cap_rank ?? coin.coingecko_rank}</Rank>
                  </Item>
                </CoinLink>
              ))}
        </List>
      </Box>

      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          coin: '',
        }}
        validationSchema={schema}
      >
        <SearchForm>
          <Box flexGrow="1">
            <Label htmlFor="coin">
              <SearchInput
                name="coin"
                type="text"
                placeholder="coin name or symbol"
                autoComplete="off"
              />
              <ClearBtn type="reset" onClick={handleReset}>
                <IoIosCloseCircle size="20" />
              </ClearBtn>
              <StyledErrorMsg component="div" name="coin" />
            </Label>
          </Box>
          <SearchBtn type="submit">Search</SearchBtn>
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
