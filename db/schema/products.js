// db/schema/products.js
const { pgTable, serial, varchar, text, numeric, integer } = require('drizzle-orm/pg-core');

const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id').notNull(),
});

module.exports = { products };