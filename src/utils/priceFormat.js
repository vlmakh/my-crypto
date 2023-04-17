export const priceFormat = price => {
  if (price >= 100) {
    return price.toFixed(0);
  }
  if (price < 100 && price > 10) {
    return price.toFixed(1);
  }
  if (price < 0.0001) {
    return price.toFixed(8);
  }
  if (+price < 0.01) {
    return price.toFixed(4);
  }
  if (+price < 0.1) {
    return price.toFixed(3);
  } else {
    return price;
  }
};
