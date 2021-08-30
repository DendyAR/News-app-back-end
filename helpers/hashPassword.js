const bcrypt = require("bcrypt");
const formResponse = require("../helpers/formResponse/formResponse")

const hash = (password) => {
    return new Promise((resolve, reject) => {
        const saltRounds = 10
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(formResponse("hashing failed", 500))
            resolve(hash)
        })
    })
}

module.exports = hash