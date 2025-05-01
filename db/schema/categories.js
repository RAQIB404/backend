// db/schema/categories.js
const { pgTable, serial, varchar } = require('drizzle-orm/pg-core');

const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

module.exports = { categories };