const Router = require('express').Router()

const peopleController = require('./modules/people/controller')
Router.use('/persons', peopleController)

module.exports = Router
