const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (cents)
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return paymentIntent;
  } catch (error) {
    console.error('Stripe Error:', error);
    throw new Error(error.message);
  }
};

module.exports = { createPaymentIntent };
