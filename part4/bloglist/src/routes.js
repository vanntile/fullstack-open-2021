const Router = require('express').Router()

const blogController = require('./modules/blog/controller')
Router.use('/blogs', blogController)

module.exports = Router
