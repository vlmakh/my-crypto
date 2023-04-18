import { Box } from 'components/Box/Box';
import {
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
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import { BtnAdd, BackLinkBtn } from 'components/Buttons/Buttons.styled';
import { useContext } from 'react';
import { UserData } from 'utils/context';
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'utils/firebase';

export default function CoinPage() {
  const { user, watchlist } = useContext(UserData);
  const params = useParams();
  const [coin, setCoin] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  useEffect(() => {
    singleCoin(params.coinId)
      .then(data => {
        setCoin(data);
        document.title = `My Crypto | ${data.name}`;
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [params.coinId]);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, 'watchlist', user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
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
        { coins: watchlist.filter(coinId => coinId !== coin?.id) },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <TopBar>
        <BackLinkBtn to={backLink.current}>Back</BackLinkBtn>
        {user.uid && (
          <BtnAdd
            onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            saved={inWatchlist}
          >
            {inWatchlist ? <HiStar size="24" /> : <HiOutlineStar size="24" />}
          </BtnAdd>
        )}
      </TopBar>

      {coin && (
        <Box textAlign="center" mt={4}>
          <Image src={coin?.image.large} alt={coin?.name} width="100" />
          <Symbol>{coin.symbol}</Symbol>
          <Name>{coin.name}</Name>
          <Rank>rank: {coin.market_cap_rank}</Rank>
          <Price>{coin.market_data.current_price.usd} USD</Price>

          <Descr>{parse(coin?.description.en)}</Descr>
        </Box>
      )}
    </Box>
  );
}
