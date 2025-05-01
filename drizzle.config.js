// drizzle.config.js
export default {
    schema: [
        "./db/schema/users.js",
        "./db/schema/categories.js",
        "./db/schema/products.js",
        "./db/schema/orders.js",        
        "./db/schema/orderItems.js",
        "./db/schema/payments.js",
        "./db/schema/address.js",
      ],
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL || "postgres://Raqib:Raqib%400209@localhost:5432/mydatabase"
    },
    // Optional but recommended:
    verbose: true,
    strict: true
  }