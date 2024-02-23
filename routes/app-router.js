const appRouter = require('express').Router()
const { getEndpoints } = require('../controllers/app.controller')
const articlesRouter = require('./articles-router')
const commentsRouter = require('./comments-router')
const topicsRouter = require('./topics-router')
const usersRouter = require('./users-router')

appRouter.get('/', getEndpoints)
appRouter.use('/topics', topicsRouter)
appRouter.use('/articles', articlesRouter)
appRouter.use('/users', usersRouter)
appRouter.use('/comments', commentsRouter)

module.exports = appRouter
