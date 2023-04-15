import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage';
import { ProductsPage } from 'pages/Products';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { UserData } from 'utils/context';

export const App = () => {
  const [user, setUser] = useState({isLogin: false});

  return (
    <ThemeProvider theme={theme}>
      <UserData.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>
        </Routes>
      </UserData.Provider>
    </ThemeProvider>
  );
};
