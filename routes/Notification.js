const route = require('express').Router()
const notificationController = require('../controllers/Notification')

route.get('/:id', notificationController.getNotificationById)
route.get('/list/:id', notificationController.getNotificationListByUserId)
route.get('/', notificationController.getAllNotification)
route.delete('/remove', notificationController.deleteNotificationById)


module.exports=route