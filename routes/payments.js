const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const { payments } = require('../db/schema/payments');

// GET all payments
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(payments);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET payments by order ID
router.get('/order/:orderId', async (req, res) => {
  const orderId = parseInt(req.params.orderId);
  try {
    const result = await db
      .select()
      .from(payments)
      .where(payments.orderId.eq(orderId));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new payment
router.post('/', async (req, res) => {
  const { orderId, amount, status } = req.body;
  try {
    const result = await db
      .insert(payments)
      .values({ orderId, amount, status })
      .returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update payment status
router.put('/:id', async (req, res) => {
  const paymentId = parseInt(req.params.id);
  const { status } = req.body;
  try {
    const result = await db
      .update(payments)
      .set({ status })
      .where(payments.id.eq(paymentId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a payment record
router.delete('/:id', async (req, res) => {
  const paymentId = parseInt(req.params.id);
  try {
    await db.delete(payments).where(payments.id.eq(paymentId));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
