const Router = require('express').Router()
const config = require('./utils/config')

const blogController = require('./modules/blog/controller')
Router.use('/blogs', blogController)

const userController = require('./modules/user/controller')
Router.use('/users', userController)

const loginController = require('./modules/login/controller')
Router.use('/login', loginController)

if (config.NODE_ENV === 'test') {
  const testingRouter = require('./modules/reset/controller')
  Router.use('/testing', testingRouter)
}

module.exports = Router
