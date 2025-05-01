const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const { orders } = require('../db/schema/orders');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(orders);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single order by ID
router.get('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  try {
    const result = await db.select().from(orders).where(orders.id.eq(orderId));
    if (result.length === 0) return res.status(404).json({ message: 'Order not found' });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  const { userId, totalAmount, status } = req.body;
  try {
    const result = await db
      .insert(orders)
      .values({ userId, totalAmount, status })
      .returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update order status
router.put('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const result = await db
      .update(orders)
      .set({ status })
      .where(orders.id.eq(orderId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE an order
router.delete('/:id', async (req, res) => {
  const orderId = parseInt(req.params.id);
  try {
    await db.delete(orders).where(orders.id.eq(orderId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
