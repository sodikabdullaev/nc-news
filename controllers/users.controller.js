const { selectUsers, selectUserByUsername } = require('../models/users.model')

exports.getUsers = (req, res, next) => {
	selectUsers()
		.then(({ rows }) => {
			res.status(200).send({ users: rows })
		})
		.catch(next)
}
exports.getUserByUsername = (req, res, next) => {
	const { username } = req.params
	selectUserByUsername(username)
		.then((user) => {
			res.status(200).send({ user })
		})
		.catch(next)
}
