const route = require('express').Router()
const ArticleController = require('../controllers/Articles')
const { uploadarticles } = require('../helpers/formUpload/formUpload')

route.post('/', uploadarticles, ArticleController.addNewArticle )
route.patch('/:id', uploadarticles, ArticleController.updateArticle) 
route.get('/search', ArticleController.searchArticleByTitle)
route.get('/latest', ArticleController.getLatestArticle)
route.get('/asc', ArticleController.getArticleSortByNameAsc)
route.get('/desc', ArticleController.getArticleSortByNameDesc)
route.get('/last', ArticleController.getArticleSortByLastAdd)
route.get('/modified', ArticleController.getArticleSortBylastModif)
route.get('/:id', ArticleController.getArticleById)
route.get('/', ArticleController.getAllArticle)
route.delete('/:id', ArticleController.deleteArticleById)


module.exports=route