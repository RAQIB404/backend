const {pgTable, serial, integer, varchar} = require('drizzle-orm/pg-core');

const address = pgTable('address', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    street: varchar('street',{length: 255}).notNull(),
    city:varchar('city',{length :100}).notNull(),
    state:varchar('state',{lenght : 100}).notNull(),
    country:varchar('country',{length : 100}).notNull(),
    zipCode:varchar('zip_code',{length : 20}).notNull(),
})

module.exports = { address };