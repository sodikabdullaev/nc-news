const express = require('express')
const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('./controllers/errors.controller')
const { getTopics } = require('./controllers/topics.controller')

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)

app.use((err, req, res, next), handlePsqlErrors)
app.use((err, req, res, next), handleCustomErrors)
app.use((err, req, res, next), handleServerErrors)

module.exports = app
