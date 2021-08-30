const  Route  = require("express").Router();
const { login, register} = require('../controllers/Auth')

Route.post("/login", login)
Route.post("/register", register)

module.exports = Route


