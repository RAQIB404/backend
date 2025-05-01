const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const { orderItems } = require('../db/schema/orderItems');

// GET all order items
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(orderItems);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET items by order ID
router.get('/order/:orderId', async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  try {
    const items = await db
      .select()
      .from(orderItems)
      .where(orderItems.orderId.eq(orderId));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add item to order
router.post('/', async (req, res) => {
  const { orderId, productId, quantity, price } = req.body;
  try {
    const result = await db
      .insert(orderItems)
      .values({ orderId, productId, quantity, price })
      .returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update item quantity or price
router.put('/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { quantity, price } = req.body;
  try {
    const result = await db
      .update(orderItems)
      .set({ quantity, price })
      .where(orderItems.id.eq(itemId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE item from order
router.delete('/:id', async (req, res) => {
  const itemId = parseInt(req.params.id);
  try {
    await db.delete(orderItems).where(orderItems.id.eq(itemId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
