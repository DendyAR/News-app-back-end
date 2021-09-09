const { Client } = require("pg");
require("dotenv").config();

const pg =(process.env.VERSION_STATE == `production`) ? new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl : {
    rejectUnauthorized: false
  }
}):
new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pg.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Connecction error", err));

module.exports = pg;
