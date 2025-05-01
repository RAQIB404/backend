// db/schema/products.js
import { pgTable, serial, varchar, text, numeric, integer } from 'drizzle-orm/pg-core';
const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id').notNull(),
});

export default products;