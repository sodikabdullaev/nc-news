const {
	selectArticleById,
	selectArticles,
	selectCommentsByArticleId,
	updateArticleVote,
} = require('../models/articles.model')
const { getTopicBySlug } = require('../models/topics.model')

exports.getArticleById = (req, res, next) => {
	const { article_id } = req.params
	selectArticleById(article_id)
		.then((rows) => {
			res.status(200).send({ article: rows[0] })
		})
		.catch(next)
}
exports.getArticles = (req, res, next) => {
	const { topic, sort_by, order } = req.query
	const promises = [selectArticles(topic, sort_by, order)]
	if (topic) promises.push(getTopicBySlug(topic))

	Promise.all(promises)
		.then((responses) => {
			res.status(200).send({ articles: responses[0] })
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
exports.patchArticle = (req, res, next) => {
	const { article_id } = req.params
	const { inc_votes } = req.body
	if (article_id && typeof inc_votes === 'number') {
		updateArticleVote(inc_votes, article_id)
			.then((article) => {
				res.status(200).send({ article })
			})
			.catch(next)
	} else next({ status: 400, msg: 'Bad request' })
}
