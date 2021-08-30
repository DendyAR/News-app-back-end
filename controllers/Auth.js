const { login, register } = require("../models/Auth");

const authController = {
    login: async (req, res) => {
        try {
            const result = await login(req);
            res.status(result.statusCode).send(result);
        } catch (err) {
            res.status(err.statusCode).send(err);
            // console.log(err,'controller')
        }
    },

    register: async (req, res) => {
        try {
            const result = await register(req);
            console.log(req,'controller req')
            res.status(result.statusCode).send(result);
        } catch (err) {
            res.status(err.statusCode).send(err);
            console.log(err,'controller')
        }
    },

};

module.exports = authController;

  //   userRegister: (req, res) => {
  //     authModel
  //       .userRegister(req)
  //       .then((result) => {
  //         formResponse(result, res);
  //       })
  //       .catch((err) => {
  //         formResponse(err, res);
  //       });
  //   },
  //   userLogin : (req, res)=>{
  //     // console.log(req,'ini request controller')
  //     authModel.userLogin(req.body).then((result)=>{
  //         formResponse(result, res)
  //     }).catch((err)=>{
  //       console.log(err,'ini error controller')
  //         formResponse(err, res)
  //     })
  // };
