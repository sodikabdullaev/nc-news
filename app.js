const express = require('express')
const endpoints = require('./endpoints.json')
const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('./controllers/errors.controller')
const { getTopics } = require('./controllers/topics.controller')

const app = express()
app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', (req, res) => {
	res.status(200).send({ endpoints })
})

app.use((req, res, next) => handlePsqlErrors)
app.use((req, res, next) => handleCustomErrors)
app.use((req, res, next) => handleServerErrors)

module.exports = app
