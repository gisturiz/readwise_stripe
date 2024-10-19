// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Chat from './components/Chat';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import PromotionBanner from './components/PromotionBanner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { CartContext } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';


const stripePromise = loadStripe('pk_test_51HJiydJpoxo4h6bDqsemJC8To4JHZDTnGiiOFmy9616dAYOz5Me6sjgMZGjkpd8W7g5XNxpIkiHuc7TJ5ho9ygYC00a2ImpFHs');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CartContext.Consumer>
        {({ cartItems }) => (
          <Router>
            <div>
              <PromotionBanner />
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                    <HomeIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ReadWise
                  </Typography>
                  <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItems.length} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Routes>
                <Route exact path="/" element={<Chat />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
          </Router>
        )}
      </CartContext.Consumer>
    </Elements>
  );
}

export default App;
