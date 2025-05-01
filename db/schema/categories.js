// db/schema/categories.js
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export default categories;