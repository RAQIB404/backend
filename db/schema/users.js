const { pgTable, serial, varchar, timestamp } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { users };