// db/schema/orders.js
import { pgTable, serial, integer, timestamp } from 'drizzle-orm/pg-core';
const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export default orders;