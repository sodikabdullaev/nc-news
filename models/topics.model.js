const db = require('../db/connection')
exports.selectTopics = () => {
	return db.query(`SELECT * FROM topics`).then(({ rows }) => {
		if (rows.length === 0)
			return Promise.reject({ status: 404, msg: 'Not found' })
		else return rows
	})
}

exports.getTopicBySlug = (slug) => {
	return db
		.query(
			`SELECT * FROM topics
	WHERE slug=$1`,
			[slug]
		)
		.then(({ rows }) => {
			if (rows.length === 0)
				return Promise.reject({ status: 404, msg: 'Not found' })
			else return rows[0]
		})
}
