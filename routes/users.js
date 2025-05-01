const express = require('express');
const router = express.Router();
const { db } = require('../db/db');
const { users } = require('../db/schema/users');

// GET all users
router.get('/', async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await db.select().from(users).where(users.id.eq(userId));
    if (user.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await db.insert(users).values({ name, email }).returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  try {
    const result = await db.update(users)
      .set({ name, email })
      .where(users.id.eq(userId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await db.delete(users).where(users.id.eq(userId));
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
