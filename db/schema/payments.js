// db/schema/payments.js
import { pgTable, serial, integer, numeric, varchar, timestamp } from 'drizzle-orm/pg-core';
const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
  paidAt: timestamp('paid_at').defaultNow(),
});

export default payments;