import { Box } from 'components/Box/Box';
import { TopBar, Image } from 'components/CoinInfo/CoinInfo.styled';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { singleCoin } from 'utils/api';
import parse from 'html-react-parser';
import { HiStar, HiOutlineStar } from 'react-icons/hi';
import { BtnAdd, BackLinkBtn } from 'components/Buttons/Buttons.styled';
import { useContext } from 'react';
import { UserData } from 'utils/context';

export const CoinPage = () => {
  const { user } = useContext(UserData);
  const params = useParams();
  const [coin, setCoin] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');
  const [saved, setSaved] = useState(false);

  const handleSaveToLib = () => {
    setSaved(!saved);
  };

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

  return (
    <Box>
      <TopBar>
        <BackLinkBtn to={backLink.current}>Back</BackLinkBtn>
        {user.id && (
          <BtnAdd onClick={handleSaveToLib} saved={saved}>
            {saved ? <HiStar size="24" /> : <HiOutlineStar size="24" />}
          </BtnAdd>
        )}
      </TopBar>

      {coin && (
        <Box textAlign="center" mt={5}>
          <Image src={coin?.image.large} alt={coin?.name} width="100" />

          <p>{coin.name}</p>
          <p>{parse(coin?.description.en)}</p>
        </Box>
      )}
    </Box>
  );
};
