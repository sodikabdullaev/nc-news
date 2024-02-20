const db = require('../db/connection')
exports.selectArticleById = (id) => {
	return db
		.query(
			`SELECT * FROM articles
        WHERE article_id = $1
    `,
			[id]
		)
		.then(({ rows }) => {
			if (rows.length === 0)
				return Promise.reject({ status: 404, msg: 'Not found' })
			else return rows
		})
}
exports.selectArticles = () => {
	return db
		.query(
			`SELECT articles.author, articles.title, articles.article_id, 
    articles.topic, articles.created_at, articles.votes,
    articles.article_img_url, count(comments.article_id)::int as comment_count 
    FROM articles LEFT JOIN comments on articles.article_id=comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at desc`
		)
		.then(({ rows }) => {
			if (rows.length === 0)
				return Promise.reject({ status: 204, msg: 'No Content Found ' })
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
			if (rows.length === 0)
				return Promise.reject({ status: 404, msg: 'Not found' })
			else return rows
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
