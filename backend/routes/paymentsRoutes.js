const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Calculate total amount
  const totalAmount = items.length * 1500; // $15 per book, amount in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

router.post('/create-subscription', async (req, res) => {
  const { paymentMethodId, email, priceId } = req.body;

  try {
    // Attach the payment method to the customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email: email,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      expand: ['latest_invoice.payment_intent'],
    });

    res.send(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;