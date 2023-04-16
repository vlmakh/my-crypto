import { Box } from 'components/Box/Box';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { singleCoin } from 'utils/api';

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
    <Box display="flex" alignItems="center" justifyContent="center">
      <Link to={backLink.current}>Back</Link>
      {coin && <p>{coin.name}</p>}
    </Box>
  );
};
