const formResponse = require("../helpers/formResponse/formResponse");
const articleModel = require("../models/Articles");


const ArticleController = {
  getAllArticle: async(req, res) => {
    try {
        const result = await articleModel.getAllArticle(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

addNewArticle: (req, res) => {
  articleModel.addNewArticle(req).then((result)=>{
    formResponse(result, res)
  }).catch((err)=>{
    formResponse(err, res)
    console.log(err, 'bawa controller')
  })
},

getArticleById: async(req, res) => {
    try {
        const result = await articleModel.getArticleById(req.params.id)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

getLatestArticle: async(req, res) => {
    try {
        const result = await articleModel.getLatestArticle(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

getArticleSortByNameAsc: async(req, res) => {
    try {
        const result = await articleModel.getArticleSortByNameAsc(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

getArticleSortByNameDesc: async(req, res) => {
    try {
        const result = await articleModel.getArticleSortByNameDesc(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

getArticleSortByLastAdd: async(req, res) => {
    try {
        const result = await articleModel.getArticleSortByLastAdd(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

getArticleSortBylastModif: async(req, res) => {
    try {
        const result = await articleModel.getArticleSortBylastModif(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

deleteArticleById: async(req, res) => {
    try {
        const result = await articleModel.deleteArticleById(req.params.id)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

updateArticle: async(req, res) => {
    try {
        const result = await articleModel.updateArticle(req)
        res.status(result.statusCode).send(result);
    } catch (error) {
        res.status(error.statusCode).send(error);
    }
},

searchArticleByTitle: async (req, res) => {
    try {
      const result = await articleModel.searchArticleByTitle(req.query);
      res.status(result.statusCode).send(result)
    } catch (err) {
      res.status(err.statusCode).send(err)
    }
  }
};
module.exports = ArticleController;
