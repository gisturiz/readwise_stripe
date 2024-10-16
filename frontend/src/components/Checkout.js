import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) return;
    // Create PaymentIntent when the component mounts
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
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      // Show error to your customer
      setMessage(result.error.message);
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
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <CardElement options={{ hidePostalCode: true }} />
        <button type="submit" disabled={!stripe || !elements || loading}>
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
