import { Box } from 'components/Box/Box';
import {
  CoinPageWrap,
  TopBar,
  Image,
  Symbol,
  Name,
  Rank,
  Price,
  Descr,
} from 'components/CoinInfo/CoinInfo.styled';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { singleCoin } from 'utils/api';
import parse from 'html-react-parser';
import { HiStar, HiOutlineStar, HiArrowLeft } from 'react-icons/hi';
import { BtnAdd, BackLinkBtn } from 'components/Buttons/Buttons.styled';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';
import { formatPrice } from 'utils/formatPrice';
import { LoadingSpinner } from 'components/LoadingSpinner/LoadingSpinner';
import { formatDate } from 'utils/formatDate';

export default function CoinPage() {
  const { user, watchlist } = useContext(UserData);
  const params = useParams();
  const [coin, setCoin] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    singleCoin(params.coinId, controller.signal)
      .then(data => {
        setCoin(data);
        document.title = `My Crypto | ${data.name}`;
      })
      .catch(error => setIsError('Network error'))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, [params.coinId, setIsLoading]);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin.id] : [coin.id] },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);

    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter(coinId => coinId !== coin.id) },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <CoinPageWrap>
      <TopBar>
        <BackLinkBtn to={backLink.current}>
          <HiArrowLeft size="24" />
        </BackLinkBtn>
        {user.uid && (
          <BtnAdd
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            saved={inWatchlist}
          >
            {inWatchlist ? <HiStar size="24" /> : <HiOutlineStar size="24" />}
          </BtnAdd>
        )}
      </TopBar>

      {isError && <h2>{isError}</h2>}

      {isLoading && <LoadingSpinner />}

      {coin && (
        <Box mt={4}>
          <Box display="flex" mx="auto" width="300px" alignItems="center">
            <Rank>rank: {coin.market_cap_rank ?? coin.coingecko_rank}</Rank>
            <Image src={coin?.image.large} alt={coin?.name} width="100" />
            <Box width="100px">
              <Symbol>{coin.symbol}</Symbol>
              <Name>{coin.name}</Name>
            </Box>
          </Box>

          <Price>{coin.market_data.current_price.usd}$</Price>

          <Descr>
            Price change 24h: {formatPrice(coin.market_data.price_change_24h)}
            $, {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </Descr>

          <Descr>
            ATH, {formatDate(coin.market_data.ath_date.usd)}:{' '}
            {formatPrice(coin.market_data.ath.usd)}$
          </Descr>

          <Descr>
            Max:{' '}
            {coin.market_data.max_supply
              ? (+coin.market_data.max_supply.toFixed(0)).toLocaleString()
              : (+coin.market_data.total_supply.toFixed(0)).toLocaleString()}
          </Descr>

          <Descr>
            Circulating:{' '}
            {(+coin.market_data.circulating_supply.toFixed(0)).toLocaleString()}
          </Descr>

          <Descr>{parse(coin?.description.en)}</Descr>

          <Descr>
            <a href={coin?.links?.homepage} target="_blank" rel="noreferrer">
              {coin?.links?.homepage[0]}
            </a>
          </Descr>
        </Box>
      )}
    </CoinPageWrap>
  );
}
