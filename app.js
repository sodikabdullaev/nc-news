const express = require('express')
const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('./controllers/errors.controller')
const appRouter = require('./routes/app-router')

const app = express()
app.use(express.json())

app.use('/api', appRouter)
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app
