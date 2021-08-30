const userModel = require("../models/User")
const { getUsers, addnewUser, getUserById, deleteUserById, patchUserById } = require("../models/User")


const userController = {
    getUsers: async(req, res) => {
      // console.log(req)
        try {
            const result = await getUsers(req)
            res.status(result.statusCode).send(result)
        } catch (err) {
            res.status(err.statusCode).send(err)
            // console.log(err, 'controller get')
        }
    },

    addnewUsers: (req, res) => {
            // console.log(req)
            userModel
                .addnewUser(req)
                .then((result) => {
                    res.status(result.statusCode).send(result)
                })
                .catch((err) => {
                  // console.log(err)
                    res.status(err.statusCode).send(err)
                })
        },

    getUserById: async(req, res) => {
        try {
            const result = await getUserById(req)
            res.status(result.statusCode).send(result)
        } catch (err) {
            res.status(err.statusCode).send(err)
            console.log(err,'get')
        }
    },

    deleteUserById: async(req, res) => {
        try {
            const result = await deleteUserById(req)
            res.status(result.statusCode).send(result)
        } catch (err) {
            res.status(err.statusCode).send(err)
        }
    },

    patchUserById: async(req, res) => {
        try {
            const result = await patchUserById(req)
            res.status(result.statusCode).send(result)
        } catch (err) {
            res.status(err.statusCode).send(err)
        }
    }
}

module.exports = userController