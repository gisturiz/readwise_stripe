// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);