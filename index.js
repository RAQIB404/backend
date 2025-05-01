import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { db } from './db/db.js';
import { sql } from 'drizzle-orm';
import  users  from './db/schema/users.js';


import usersRoutes from './routes/users.js';
import categoriesRoutes from './routes/categories.js';
import productsRoutes from './routes/products.js';
import ordersRoutes from './routes/orders.js';
import orderItemsRoutes from './routes/orderItems.js';
import paymentsRoutes from './routes/payments.js';
import addressRoutes from './routes/address.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order-items', orderItemsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/address', addressRoutes);

// Test DB Connection
async function testConnection() {
  try {
    await db.execute(sql`SELECT 1`);
    await db.select().from(users).limit(1);
    console.log('✅ Database connection test passed.');
  } catch (err) {
    console.error('❌ DB connection failed:', {
      message: err.message,
      stack: err.stack,
    });
    process.exit(1);
  }
}

// Start server
testConnection().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
