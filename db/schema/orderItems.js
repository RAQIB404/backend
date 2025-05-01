// db/schema/orderItems.js
import { pgTable, serial, integer, numeric } from 'drizzle-orm/pg-core';
const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  productId: integer('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
});

export default orderItems;