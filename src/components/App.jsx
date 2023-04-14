import { ThemeProvider } from '@emotion/react';
import { theme } from 'utils/theme';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { HomePage } from 'pages/Home';
import { ProductsPage } from 'pages/Products';
import { Routes, Route } from 'react-router-dom';

export const App = () => {
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
