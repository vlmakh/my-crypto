import { Box } from 'components/Box/Box';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { singleCoin } from 'utils/api';
import parse from 'html-react-parser';

export const CoinPage = () => {
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

  return (
    <Box mt={5}>
      <Link to={backLink.current}>Back</Link>
      {coin && (
        <Box textAlign="center">
          <img src={coin?.image.large} alt={coin?.name} height="100" />
          <p>{coin.name}</p>
          <p>{parse(coin?.description.en)}</p>
        </Box>
      )}
    </Box>
  );
};
