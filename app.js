const express = require('express')
const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('./controllers/errors.controller')
const { getTopics } = require('./controllers/topics.controller')
const {
	getArticleById,
	getArticles,
	getCommentsByArticleId,
	patchArticle,
} = require('./controllers/articles.controller')
const { getEndpoints } = require('./controllers/app.controller')
const { postComment } = require('./controllers/comments.controller')

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.patch('/api/articles/:article_id', patchArticle)
app.post('/api/articles/:article_id/comments', postComment)
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app
