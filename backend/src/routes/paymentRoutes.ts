import express from 'express';
import Stripe = require('stripe');
import dotenv from 'dotenv';
import Order from '../models/Order';

dotenv.config();

const router = express.Router();
const stripeModule = require('stripe');
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

// @desc    Create Stripe Payment Intent
// @route   POST /api/payment/create-intent
// @access  Public (in real app, this should be Private/Authenticated)
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe accepts amounts in cents
      currency: currency || 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Save order to database after successful payment
// @route   POST /api/payment/save-order
// @access  Private
router.post('/save-order', async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentResult,
      user
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user, 
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch(error: any) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user orders
// @route   GET /api/payment/my-orders/:userId
// @access  Private
router.get('/my-orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
