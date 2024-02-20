const { selectArticleById } = require('../models/articles.model')

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params
	selectArticleById(article_id)
		.then(({ rows }) => {
			if (rows.length === 0)
				return Promise.reject({ status: 404, msg: 'Not found' })
			res.status(200).send({ article: rows[0] })
		})
		.catch(next)
}
