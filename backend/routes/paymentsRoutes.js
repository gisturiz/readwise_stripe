const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { items, promotionCode } = req.body;

  try {
    // Calculate the order amount from items
    let totalAmount = calculateOrderAmount(items);

    // Prepare payment intent data
    let paymentIntentData = {
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    };

    // If a promotion code is provided
    if (promotionCode) {
      // Retrieve the promotion code from Stripe
      const promotionCodes = await stripe.promotionCodes.list({
        code: promotionCode,
        active: true,
      });

      if (promotionCodes.data.length === 0) {
        return res.status(400).json({ error: 'Invalid or expired promotion code.' });
      }

      const promoCode = promotionCodes.data[0];

      // Adjust the total amount after discount
      totalAmount = await applyDiscount(totalAmount, promoCode.coupon);
      paymentIntentData.amount = totalAmount;

      // Optionally, include the promotion code in the metadata
      paymentIntentData.metadata = {
        promotion_code: promoCode.id,
      };
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount, // Send the updated amount to frontend
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to calculate order amount
function calculateOrderAmount(items) {
  let amount = 0;
  items.forEach((item) => {
    // Assign default values if undefined
    const price = item.price !== undefined ? parseFloat(item.price) : 15;
    const quantity = item.quantity !== undefined ? parseInt(item.quantity, 10) : 1;

    const itemTotal = price * quantity;
    amount += itemTotal;
  });
  return Math.round(amount * 100); // Convert to cents
}

// Helper function to apply discount
async function applyDiscount(totalAmount, coupon) {
  if (coupon.amount_off) {
    // Subtract fixed amount (amount_off is in cents)
    totalAmount -= coupon.amount_off;
  } else if (coupon.percent_off) {
    // Apply percentage discount
    totalAmount -= Math.round((totalAmount * coupon.percent_off) / 100);
  }

  return Math.max(totalAmount, 50); // Minimum amount of 50 cents
}


module.exports = router;