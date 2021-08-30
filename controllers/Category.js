const categoryModel = require("../models/Category");

const categoryController = {
  getAllCategory: async(req, res) => {
      try {
          const result = await categoryModel.getAllCategory(req)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  addNewCategory: async(req, res) => {
      try {
          const result = await categoryModel.addNewCategory(req)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  getCategoryById: async(req, res) => {
      try {
          const result = await categoryModel.getCategoryById(req.params.id)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  getArticlesByCategoryId: async(req, res) => {
      try {
          const result = await categoryModel.getArticlesByCategoryId(req)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  getRecommendedArticlesByCategoryId: async(req, res) => {
      try {
          const result = await categoryModel.getRecommendedArticlesByCategoryId(req)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  deleteCategoryById: async(req, res) => {
      try {
          const result = await categoryModel.deleteCategoryById(req.params.id)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  },

  updateCategory: async(req, res) => {
      try {
          const result = await categoryModel.updateCategory(req)
          res.status(result.statusCode).send(result);
      } catch (error) {
          res.status(error.statusCode).send(error);
      }
  }
};
module.exports = categoryController;
