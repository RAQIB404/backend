import express from 'express';
const router = express.Router();
import { db } from '../db/db.js';
import  products  from '../db/schema/products.js';
// GET all products
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(products);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const result = await db.select().from(products).where(products.id.eq(productId));
    if (result.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new product
router.post('/', async (req, res) => {
  const { name, description, price, categoryId } = req.body;
  try {
    const result = await db
      .insert(products)
      .values({ name, description, price, categoryId })
      .returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
router.put('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, description, price, categoryId } = req.body;
  try {
    const result = await db
      .update(products)
      .set({ name, description, price, categoryId })
      .where(products.id.eq(productId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    await db.delete(products).where(products.id.eq(productId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;