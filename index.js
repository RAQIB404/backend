const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./db/db');
const { sql } = require('drizzle-orm');
const { users } = require('./db/schema/users'); // Just for testConnection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/order-items', require('./routes/orderItems'));
app.use('/api/payments', require('./routes/payments'));

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
