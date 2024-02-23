const {
	handlePsqlErrors,
	handleCustomErrors,
	handleServerErrors,
} = require('../controllers/errors.controller')

const errorsRouter = require('express').Router()

errorsRouter.use(handlePsqlErrors)
errorsRouter.use(handleCustomErrors)
errorsRouter.use(handleServerErrors)

module.exports = errorsRouter
