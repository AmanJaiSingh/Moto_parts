import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// @desc    Fetch all products with optional category filtering
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const category = req.query.category as string;
    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
