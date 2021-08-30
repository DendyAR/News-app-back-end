const route =require('express').Router()
const categoryController= require('../controllers/Category')
const formupload = require('../helpers/formUpload/formUpload')

route.post('/')

// route.patch('/:id',formupload.uploadProfiles, categoryController.updateUser)  

// route.get('/search', categoryController.searchUserByUsername)

// route.get('/:id', categoryController.getUsersById)

route.get('/',  categoryController.getAllCategory)

// route.delete('/:id', categoryController.deletedUserById)


module.exports=route