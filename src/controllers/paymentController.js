const { createOrder } = require('../services/razorpayService');
const { createPaymentIntent } = require('../services/stripeService');

// Razorpay Payment Controller
const initiateRazorpayPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const order = await createOrder(amount); // Call the createOrder function
    res.status(200).json({ order });
  } catch (error) {
    console.error('Error initiating Razorpay payment:', error.message);
    res.status(500).json({ error: 'Failed to initiate Razorpay payment' });
  }
};

// Stripe Payment Controller
const initiateStripePayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    const paymentIntent = await createPaymentIntent(amount, currency || 'usd');
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error initiating Stripe payment:', error.message);
    res.status(500).json({ error: 'Failed to initiate Stripe payment' });
  }
};

module.exports = { initiateRazorpayPayment, initiateStripePayment };
