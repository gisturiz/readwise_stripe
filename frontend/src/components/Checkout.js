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
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [promotionCode, setPromotionCode] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);
  const [isPromotionCodeApplied, setIsPromotionCodeApplied] = useState(false);
  const [promotionCodeMessage, setPromotionCodeMessage] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) return;

    // Calculate original total amount
    const amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setOriginalAmount(amount);

    // Create PaymentIntent
    createPaymentIntent(promotionCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const createPaymentIntent = async (promoCode) => {
    try {
      const response = await axios.post('http://localhost:3000/api/payment/create-payment-intent', {
        items: cartItems,
        promotionCode: promoCode || null,
      });

      setClientSecret(response.data.clientSecret);

      if (response.data.amount) {
        setTotalAmount(response.data.amount / 100); // Convert cents to dollars
      } else {
        throw new Error('Invalid amount received from the server.');
      }
    } catch (err) {
      console.error('Error creating payment intent:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || 'Failed to initialize payment.';
      throw new Error(errorMessage);
    }
  };

  const handleApplyPromotionCode = async () => {
    // Reset messages
    setPromotionCodeMessage('');
    setIsPromotionCodeApplied(false);
    setMessage('');

    try {
      // Re-create PaymentIntent with the promotion code
      await createPaymentIntent(promotionCode);

      // If no errors, promotion code is valid
      setIsPromotionCodeApplied(true);
      setPromotionCodeMessage('Promotion code applied successfully!');
    } catch (error) {
      // Handle errors returned from createPaymentIntent
      setPromotionCodeMessage(error.message || 'Failed to apply promotion code.');
      setIsPromotionCodeApplied(false);

      // Reset total amount to original amount if promo code is invalid
      setTotalAmount(originalAmount);
    }
  };

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
      // Show error to your customer
      setMessage(`Payment failed: ${result.error.message}`);
      setLoading(false);
    } else {
      // The payment succeeded!
      if (result.paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
        clearCart(); // Clear the cart after successful payment
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
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Promotion Code"
                variant="outlined"
                fullWidth
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                disabled={isPromotionCodeApplied} // Disable input if code is applied
              />
              <Button
                variant="contained"
                onClick={handleApplyPromotionCode}
                sx={{ mt: 1 }}
                disabled={!promotionCode || isPromotionCodeApplied} // Disable if input is empty or code is applied
              >
                Apply Promotion Code
              </Button>

              {/* Display promotion code validation messages */}
              {promotionCodeMessage && (
                <Alert
                  severity={isPromotionCodeApplied ? 'success' : 'error'}
                  sx={{ mt: 2 }}
                >
                  {promotionCodeMessage}
                </Alert>
              )}
            </Box>

            <Typography variant="body1">
              Original Amount: ${originalAmount.toFixed(2)}
            </Typography>

            {/* Only display Discount Applied if promotion code is successfully applied */}
            {isPromotionCodeApplied && (
              <Typography variant="body1">
                Discount Applied: -${(originalAmount - totalAmount).toFixed(2)}
              </Typography>
            )}

            <Typography variant="h6" gutterBottom>
              Total Amount: ${totalAmount.toFixed(2)}
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
                <CardElement />
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
