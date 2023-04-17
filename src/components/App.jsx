import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage';
import { CoinPage } from 'pages/CoinPage';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserData } from 'utils/context';
import { onSnapshot, doc } from "firebase/firestore";
import { db } from 'utils/firebase';

const savedUser = JSON.parse(localStorage.getItem('mycrypto'));

export const App = () => {
  const [user, setUser] = useState(savedUser ?? {});
  const [watchlist, setWatchlist] = useState([]);

  // console.log(user)

  useEffect(() => {
    localStorage.setItem('mycrypto', JSON.stringify(user));

    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);
  
  return (
    <ThemeProvider theme={theme}>
      <UserData.Provider value={{ user, setUser, watchlist }}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/:coinId" element={<CoinPage />} />
          </Route>
        </Routes>
      </UserData.Provider>
    </ThemeProvider>
  );
};
