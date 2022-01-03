const Router = require('express').Router()

const blogController = require('./modules/blog/controller')
Router.use('/blogs', blogController)

const userController = require('./modules/user/controller')
Router.use('/users', userController)

const loginController = require('./modules/login/controller')
Router.use('/login', loginController)

module.exports = Router
