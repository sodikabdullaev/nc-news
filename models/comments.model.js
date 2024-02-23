const db = require('../db/connection')

exports.insertComment = (article_id, body) => {
	if (body.body === undefined || body.body === '')
		return Promise.reject({ status: 400, msg: 'Body is missing' })
	return db
		.query(
			`INSERT INTO comments (body, article_id, author)
        VALUES ($1, $2, $3) RETURNING *`,
			[body.body, article_id, body.author]
		)
		.then(({ rows }) => {
			return rows[0]
		})
}
exports.deleteComment = (comment_id) => {
	return db
		.query(
			`DELETE FROM comments
    WHERE comment_id = $1`,
			[comment_id]
		)
		.then((response) => {
			if (response.rowCount === 0)
				return Promise.reject({ status: 404, msg: 'Bad request' })
		})
}
