const {
	selectArticleById,
	selectArticles,
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
