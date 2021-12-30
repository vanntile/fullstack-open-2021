const Router = require('express').Router
const peopleService = require('./service')
const { ServerError } = require('../../utils/error')

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await peopleService.get())
})

router.post('/', async (req, res) => {
  const { name, number } = req.body
  if (!name || !number) throw new ServerError('Missing required fields', 400)

  try {
    const person = await peopleService.create({ name, number })

    res.status(201).json(person)
  } catch (e) {
    if (e.name === 'ValidationError') throw new ServerError(e.message, 400)
    else throw e
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  const person = await peopleService.getById({ id })

  res.json(person)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, number } = req.body

  try {
    const person = await peopleService.update({ id, name, number })

    res.json(person)
  } catch (e) {
    // logger.info(e.name, e.message)
    // res.end(400)
    if (e.name === 'ValidationError') throw new ServerError(e.message, 400)
    else throw e
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await peopleService.remove({ id })

  res.status(204).end()
})

module.exports = router
