const { selectArticleById } = require('../models/articles.model')
const { insertComment, deleteComment } = require('../models/comments.model')
const { selectUserByUsername } = require('../models/users.model')
const { getArticleById } = require('./articles.controller')

exports.postComment = (req, res, next) => {
	const { article_id } = req.params
	const promises = [
		selectUserByUsername(req.body.author),
		selectArticleById(article_id),
		insertComment(article_id, req.body),
	]
	Promise.all(promises)
		.then((responses) => {
			res.status(201).send({ comment: responses[2] })
		})
		.catch(next)
}
exports.removeComment = (req, res, next) => {
	const { comment_id } = req.params
	deleteComment(comment_id)
		.then(() => {
			res.status(204).send({
				msg: 'Comment has been deleted successfully',
			})
		})
		.catch(next)
}
