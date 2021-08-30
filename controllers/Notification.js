const notificationModel = require("../models/Notification")

const notificationController = {
    getAllNotification: async(req, res) => {
        try {
            const result = await notificationModel.getAllNotif(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getNotificationById: async(req, res) => {
        try {
            const result = await notificationModel.getNotifById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getNotificationListByUserId: async(req, res) => {
        try {
            const result = await notificationModel.getNotifListByUserId(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    deleteNotificationById: async(req, res) => {
        try {
            const result = await notificationModel.deleteNotifById(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },
}

module.exports = notificationController