import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    },
    invalid: {
      color: '#c23d4b',
    },
  },
};

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) return;

    axios
      .post('http://localhost:3000/api/payment/create-payment-intent', {
        items: cartItems,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error('Error creating payment intent:', err);
      });
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    if (!clientSecret) {
      setMessage('Failed to initialize payment.');
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(`Payment failed: ${result.error.message}`);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
        clearCart();
        setLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      {message && (
        <Alert severity={message.includes('succeeded') ? 'success' : 'error'} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {cartItems.length === 0 ? (
        <Typography variant="body1">
          Your cart is empty. <Link to="/">Go back to shop.</Link>
        </Typography>
      ) : (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Amount: ${(cartItems.length * 15).toFixed(2)}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Box
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  p: 2,
                  mb: 2,
                }}
              >
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!stripe || !elements || loading}
                fullWidth
              >
                {loading ? (
                  <>
                    Processing...
                    <CircularProgress size={24} sx={{ ml: 2, color: 'white' }} />
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Checkout;
