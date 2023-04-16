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
    <Box mt={5}>
      <Link to={backLink.current}>Back</Link>
      {coin && (
        <Box textAlign="center">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="100"
            style={{ marginBottom: 20 }}
          />
          <p>{coin.name}</p>
          <p>{coin?.description.en.split('. ')[0]}</p>
        </Box>
      )}
    </Box>
  );
};
