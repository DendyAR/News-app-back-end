// require('newrelic');
const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const router = require("./routes");
router(app, "/news/api");

app.get("*", (req, res) => {
  res.send("Not Found!");
});


app.listen(port, () => {
  console.log(
    `app listening at http://${process.env.HOST || "localhost"}:${port} `
  );
});
