export const formatPrice = price => {
  if (!price) {
    return;
  }

  const value = Math.abs(price);

  if (value >= 10) {
    return price.toFixed(0);
  }
  if (value < 10 && value > 1) {
    return price.toFixed(1);
  }
  if (value < 0.0001) {
    return price.toFixed(8);
  }
  if (value < 0.01) {
    return price.toFixed(4);
  }
  if (value < 0.1) {
    return price.toFixed(3);
  } else {
    return price.toFixed(2);
  }
};
