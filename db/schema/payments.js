// db/schema/payments.js
const { pgTable, serial, integer, numeric, timestamp, varchar } = require('drizzle-orm/pg-core');

const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  paidAt: timestamp('paid_at').defaultNow(),
});

module.exports = { payments };