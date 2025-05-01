// db/schema/orders.js
const { pgTable, serial, integer, timestamp } = require('drizzle-orm/pg-core');

const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { orders };