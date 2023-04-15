import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { HomePage } from 'pages/HomePage';
import { ProductsPage } from 'pages/Products';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

export const App = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
