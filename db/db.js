// db/db.js
const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { users } = require('./schema/users');
const { categories } = require('./schema/categories');
const { products } = require('./schema/products');
const { orders } = require('./schema/orders');        
const { orderItems } = require('./schema/orderItems');        
const { payments } = require('./schema/payments');
const { address } = require('./schema/address');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const db = drizzle(pool, {
  schema: {
    users: users,
    categories: categories,
    products: products,  
    orders: orders,
    orderItems: orderItems,  
    payments: payments,
    address: address,
  },
});

module.exports = { db };