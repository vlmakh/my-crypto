import axios from 'axios';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

const currency = 'USD';

export const coinList = async page => {
  const response = await axios.get(
    `${MAIN_URL}/markets?vs_currency=USD&per_page=10&page=${page}`
  );
  return response.data;
};

export const singleCoin = id => `https://api.coingecko.com/api/v3/coins/${id}`;

export const historicalChart = (id, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const trendingCoins = () =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
