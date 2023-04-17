import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage';
import { CoinPage } from 'pages/CoinPage';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserData } from 'utils/context';

const savedUser = JSON.parse(localStorage.getItem('mycrypto'));

export const App = () => {
  const [user, setUser] = useState(savedUser ?? {});

  // console.log(user)

  useEffect(() => {
    localStorage.setItem('mycrypto', JSON.stringify(user));
  }, [user]);
  
  return (
    <ThemeProvider theme={theme}>
      <UserData.Provider value={{ user, setUser }}>
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
