const {
	selectArticleById,
	selectArticles,
	selectCommentsByArticleId,
} = require('../models/articles.model')

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params
	selectArticleById(article_id)
		.then((rows) => {
			res.status(200).send({ article: rows[0] })
		})
		.catch(next)
}
exports.getArticles = (req, res, next) => {
	selectArticles()
		.then((rows) => {
			res.status(200).send({ articles: rows })
		})
		.catch(next)
}
exports.getCommentsByArticleId = (req, res, next) => {
	const { article_id } = req.params
	const promises = [
		selectArticleById(article_id),
		selectCommentsByArticleId(article_id),
	]
	Promise.all(promises)
		.then((responses) => {
			res.status(200).send({ comments: responses[1] })
		})
		.catch(next)
}
