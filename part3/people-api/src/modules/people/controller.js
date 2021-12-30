const Router = require('express').Router
const peopleService = require('./service')
const { ServerError } = require('../../utils/error')

const router = Router()

router.get('/', (_req, res) => {
  res.json(peopleService.get())
})

router.post('/', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) throw new ServerError('Missing required fields', 400)

  const person = peopleService.create({ name, number })

  res.status(201).json(person)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const person = peopleService.getById({ id })

  res.json(person)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  peopleService.remove({ id })

  res.status(204).end()
})

module.exports = router
