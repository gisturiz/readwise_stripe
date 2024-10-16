// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Chat from './components/Chat';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51HJiydJpoxo4h6bDqsemJC8To4JHZDTnGiiOFmy9616dAYOz5Me6sjgMZGjkpd8W7g5XNxpIkiHuc7TJ5ho9ygYC00a2ImpFHs');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
          </nav>
          {/* Toast Container */}
          <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
          <Routes>
            <Route exact path="/" element={<Chat />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </Elements>
  );
}

export default App;
