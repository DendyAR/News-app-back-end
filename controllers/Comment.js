const commentModel = require("../models/Comment")

const commentController = {
    getAllComment: async(req, res) => {
        try {
            const result = await commentModel.getAllComment(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    addNewComment: async(req, res) => {
        try {
            const result = await commentModel.addNewComment(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getCommentById: async(req, res) => {
        try {
            const result = await commentModel.getCommentById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getCommentListByUserId: async(req, res) => {
        try {
            const result = await commentModel.getCommentListByUserId(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    getCommentListByArticleId: async(req, res) => {
        try {
            const result = await commentModel.getCommentListByArticleId(req.params.article_id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    deleteCommentById: async(req, res) => {
        try {
            const result = await commentModel.deleteCommentById(req.params.id)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    },

    updateComment: async(req, res) => {
        try {
            const result = await commentModel.updateComment(req)
            res.status(result.statusCode).send(result);
        } catch (error) {
            res.status(error.statusCode).send(error);
        }
    }
}

module.exports = commentController