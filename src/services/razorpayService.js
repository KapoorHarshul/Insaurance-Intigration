const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise for INR
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Razorpay Error:', error);
    throw new Error(error.message);
  }
};

module.exports = { createOrder }; // Ensure this is correctly exported
