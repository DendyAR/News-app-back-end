const bcrypt = require("bcrypt");
const pg = require("../helpers/connection/connection");
const jwt = require("jsonwebtoken");
const isDataEmpty = require("../helpers/checkData");
const formResponse = require("../helpers/formResponse/formResponse");
const { login, register } = require("../helpers/query/queryAuth");
const hash = require("../helpers/hashPassword");

const authModel = {
  login: (req) => {
    return new Promise((resolve, reject) => {
      const {
        body: { email, password },
      } = req;
      // console.log(req.body);
      if (!email || !password)
        reject(formResponse("Request not be empty"), 400);
      pg.query(login(email), (err, result) => {
        const { isEmpty } = isDataEmpty(result);
        if (isEmpty) reject(formResponse("Wrong email/password", 400));
        const { luser } = result?.rows[0];
        bcrypt.compare(
          password,
          result.rows[0].password,
          (errComp, resComp) => {
            // console.log(errComp, "errcom");
            if (errComp) reject(formResponse("Login failed", 500));
            if (!resComp) reject(formResponse("Wrong email/password", 400));
            const payload = {
              id: result.rows[0].id,
              role: result.rows[0].role,
            };
            jwt.sign(payload, process.env.SECRET_KEY, (errToken, resToken) => {
              // console.log(errToken, "token");
              if (errToken) reject(formResponse("Login error", 500));
              resolve(
                formResponse("Login success", 200, {
                  id: result.rows[0].id,
                  role: result.rows[0].role,
                  token: resToken,
                })
              );
            });
          }
        );
      });
    });
  },

  register: (req) => {
    return new Promise((resolve, reject) => {
      const {
        body: { email, password, phone_number },
      } = req;
      pg.query(login(email), (err, result) => {
        // console.log(result)
        const { isEmpty } = isDataEmpty(result);
        if (!isEmpty) reject(formResponse("User exist", 400));
        hash(password).then((hashValue) => {
          const newUser = {
            email: email,
            password: hashValue,
            phone_number: phone_number,
          };
          pg.query(register(newUser), (err) => {
            // console.log(err,'register')
            if (err) reject(formResponse("Register failed", 500));
            resolve(formResponse("Register success", 201));
          });
        });
      });
    });
  },

  
};

module.exports = authModel;
