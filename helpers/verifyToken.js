const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = {
  userwithId: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (decoded.id === req.params.id) {
            next();
          } else {
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
          }
        } else {
          res.status(403).send({
            message: err.message,
            statusCode: 400,
          });
        }
      });
    }
  },

  adminVerify: (req, res, next) => {
    let bearerToken = req.header("user-token");

    if (!bearerToken) {
      res.status(400).send({
        message: "Resource not found",
        statusCode: 400,
      });
    } else {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          if (decoded.role === "admin") {
            next();
          } else {
            res.status(403).send({
              message: "Forbidden",
              statusCode: 403,
            });
          }
        } else {
          res.status(403).send({
            message: err.message,
            statusCode: 400,
          });
        }
      });
    }
  },
};

module.exports = verifyToken;
