import axios from 'axios';

const MAIN_URL = process.env.REACT_APP_MAIN_URL;

const currency = 'USD';

export const coinList = async page => {
  const response = await axios.get(
    `${MAIN_URL}/markets?vs_currency=USD&per_page=10&page=${page}`
  );
  return response.data;
};

export const singleCoin = async id => {
  const response = await axios.get(`${MAIN_URL}/${id}`);
  return response.data;
};

export const historicalChart = async (id, days = 365) => {
  const response = await axios.get(
    `${MAIN_URL}/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  return response.data;
};

export const userWatchList = async array => {
  const arrayOfCoins = array.map(async coinId => {
    return await axios
      .get(`${MAIN_URL}/${coinId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
  });

  const response = await Promise.all(arrayOfCoins);
  return response;
};
