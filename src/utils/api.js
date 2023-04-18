import axios from 'axios';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

const currency = 'USD';

const coinList = async page => {
  const response = await axios.get(
    `${MAIN_URL}/coins/markets?vs_currency=USD&per_page=10&page=${page}`
  );
  return response.data;
};

const singleCoin = async id => {
  const response = await axios.get(`${MAIN_URL}/coins/${id}`);
  return response.data;
};

const historicalChart = async (id, days = 365) => {
  const response = await axios.get(
    `${MAIN_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  return response.data;
};

const userWatchList = async array => {
  const arrayOfCoins = array.map(async coinId => {
    return await axios
      .get(`${MAIN_URL}/coins/${coinId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const response = await Promise.all(arrayOfCoins);
  return response;
};

const searchCoin = async query => {
  const response = await axios.get(`${MAIN_URL}/search/?query=${query}`);
  return response.data;
};

export { coinList, singleCoin, historicalChart, userWatchList, searchCoin };
