const {
	getArticleById,
	getArticles,
	getCommentsByArticleId,
	patchArticle,
} = require('../controllers/articles.controller')
const { postComment } = require('../controllers/comments.controller')
const articlesRouter = require('express').Router()

articlesRouter.get('/:article_id', getArticleById)
articlesRouter.get('/', getArticles)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)
articlesRouter.patch('/:article_id', patchArticle)
articlesRouter.post('/:article_id/comments', postComment)

module.exports = articlesRouter
