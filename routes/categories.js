import express from 'express';
const router = express.Router();
import { db } from '../db/db.js';
import  categories  from '../db/schema/categories.js';
// GET all categories
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(categories);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single category by ID
router.get('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    const result = await db.select().from(categories).where(categories.id.eq(categoryId));
    if (result.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create category
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await db.insert(categories).values({ name, description }).returning();
    res.status(201).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { name, description } = req.body;
  try {
    const result = await db
      .update(categories)
      .set({ name, description })
      .where(categories.id.eq(categoryId))
      .returning();
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  const categoryId = parseInt(req.params.id);
  try {
    await db.delete(categories).where(categories.id.eq(categoryId));
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
