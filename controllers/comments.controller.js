const { insertComment, deleteComment } = require('../models/comments.model')

exports.postComment = (req, res, next) => {
	const { article_id } = req.params
	if (article_id && typeof req.body.body === 'string') {
		insertComment(article_id, req.body)
			.then(({ rows }) => {
				res.status(201).send({ comment: rows[0] })
			})
			.catch(next)
	} else next({ status: 400, msg: 'Bad request' })
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
