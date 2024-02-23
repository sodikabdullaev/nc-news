const db = require('../db/connection')
exports.selectArticleById = (id) => {
	return db
		.query(
			`SELECT articles.* , 
			(SELECT COUNT(comments.comment_id)::int as comment_count FROM comments WHERE comments.article_id =$1)
			FROM articles
			WHERE articles.article_id = $1
    `,
			[id]
		)
		.then(({ rows }) => {
			if (rows.length === 0) {
				return Promise.reject({ status: 404, msg: 'Article not found' })
			} else return rows
		})
}
exports.selectArticles = (topic, sort_by = 'created_at', order = 'desc') => {
	const values = []

	if (!['title', 'topic', 'author', 'body', 'created_at'].includes(sort_by)) {
		return Promise.reject({ status: 400, msg: 'Invalid sort query' })
	}

	if (!['asc', 'desc'].includes(order)) {
		return Promise.reject({ status: 400, msg: 'Invalid order query' })
	}

	let sql = `SELECT articles.author, articles.title, articles.article_id, 
    articles.topic, articles.created_at, articles.votes,
    articles.article_img_url, count(comments.article_id)::int as comment_count 
    FROM articles LEFT JOIN comments on articles.article_id=comments.article_id`

	if (topic) {
		sql += ' WHERE articles.topic = $1 '
		values.push(topic)
	}
	sql += ` GROUP BY articles.article_id `
	sql += ` ORDER BY articles.${sort_by} ${order} `

	return db.query(sql, values).then(({ rows }) => {
		if (rows.length === 0 && topic === undefined)
			return Promise.reject({ status: 404, msg: 'Not found' })
		else return rows
	})
}
exports.selectCommentsByArticleId = (article_id) => {
	return db
		.query(
			`SELECT * FROM comments 
        WHERE article_id=$1
        ORDER BY comments.created_at DESC`,
			[article_id]
		)
		.then(({ rows }) => {
			return rows
		})
}
exports.updateArticleVote = (inc_votes, article_id) => {
	return db
		.query(
			`UPDATE articles 
    SET votes = votes+$1 
    WHERE article_id = $2 RETURNING *`,
			[inc_votes, article_id]
		)
		.then(({ rows }) => {
			if (rows.length === 0)
				return Promise.reject({ status: 404, msg: 'Not found' })
			else return rows[0]
		})
}
