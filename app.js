const express = require('express')
const endpoints = require('./endpoints.json')
const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('./controllers/errors.controller')
const { getTopics } = require('./controllers/topics.controller')
const { getArticleById } = require('./controllers/articles.controller')

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', (req, res) => {
	res.status(200).send({ endpoints })
})

app.get('/api/articles/:article_id', getArticleById)

app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app
