require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "legal_tech_dev",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",

    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000,
    },
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  },
};
