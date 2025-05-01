// db/db.js (using ESM)
import dotenv from 'dotenv';
dotenv.config();
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import  users  from './schema/users.js';
import  categories  from './schema/categories.js';
import  products  from './schema/products.js';
import  orders  from './schema/orders.js';
import  orderItems  from './schema/orderItems.js';
import  payments  from './schema/payments.js';
import  address  from './schema/address.js';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const db = drizzle(pool, {
  schema: {
    users,
    categories,
    products,
    orders,
    orderItems,
    payments,
    address,
  },
});
