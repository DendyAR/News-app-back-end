const route = require('express').Router()
const formupload = require('../helpers/formUpload/formUpload')
const { addnewUsers, patchUserById, getUserById, getUsers, deleteUserById } = require('../controllers/User')

route.post('/', formupload.uploadProfiles, addnewUsers)
route.patch('/:id', formupload.uploadProfiles, patchUserById) 
route.get('/:id', getUserById)
route.get('/', getUsers)
route.delete('/:id', deleteUserById)

module.exports = route

// const route =require('express').Router()
// const userController= require('../controllers/User')
// const formupload = require('../helpers/formUpload/formUpload')

// route.post('/', formupload.uploadProfiles, userController.addNewUsers)

// route.patch('/:id',formupload.uploadProfiles, userController.updateUser)  

// route.get('/search', userController.searchUserByUsername)

// route.get('/:id', userController.getUsersById)

// route.get('/',  userController.getAllusers)

// route.delete('/:id', userController.deletedUserById)


// module.exports=route