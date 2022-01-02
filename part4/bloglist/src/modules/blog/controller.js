const Router = require('express').Router
const blogService = require('./service')
const { ServerError } = require('../../utils/error')

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await blogService.get())
})

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (title == null && url == null) throw new ServerError('Missing post title and URL', 400)

  const newEntry = await blogService.create({ title, author, url, likes: likes ?? 0 })

  res.status(201).json(newEntry)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  res.json(await blogService.getById({ id }))
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body

  if (title == null && url == null) throw new ServerError('Missing post title and URL', 400)

  const entry = await blogService.update({ id, title, author, url, likes: likes ?? 0 })

  res.json(entry)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await blogService.remove({ id })

  res.status(204).end()
})

module.exports = router
