const db = require('../db/connection')

exports.insertComment = (article_id, body) => {
	return db.query(
		`INSERT INTO comments (body, article_id, author)
        VALUES ($1, $2, $3) RETURNING *`,
		[body.body, article_id, body.author]
	)
}
