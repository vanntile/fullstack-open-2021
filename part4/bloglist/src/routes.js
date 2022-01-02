const Router = require('express').Router()

const blogController = require('./modules/blog/controller')
Router.use('/blogs', blogController)

const userController = require('./modules/user/controller')
Router.use('/users', userController)

module.exports = Router
