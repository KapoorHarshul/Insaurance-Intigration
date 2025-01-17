const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const initiatePayment = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = { amount: amount * 100, currency, receipt: 'receipt#1' };
    const order = await razorpay.orders.create(options);

    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.error('Error initiating payment:', error.message);
    res.status(500).json({ error: 'Payment initiation failed' });
  }
};

const confirmPayment = (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (generatedSignature !== signature) {
    return res.status(400).json({ error: 'Invalid payment signature' });
  }

  res.status(200).json({ message: 'Payment verified successfully' });
};

module.exports = { initiatePayment, confirmPayment };
