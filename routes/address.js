import express from 'express';
const router = express.Router();
import { db } from '../db/db.js';
import  address  from '../db/schema/address.js';

router.get('/', async (req, res) => {
    try{
        const addresses = await db.select().from(address);
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { userId, street, city, state, country, zipCode } = req.body;
    try{
        const result = await db.insert(address).values({ userId, street, city, state, country, zipCode }).returning();
        res.status(201).json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const addressId = parseInt(req.params.id);
    const { street, city, state, country, zipCode } = req.body;
    try{
        const result = await db.update(address).set({ street, city, state, country, zipCode }).where(address.id.eq(addressId)).returning();
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const addressId = parseInt(req.params.id);
    try{
        await db.delete(address).where(address.id.eq(addressId));
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

export default router;