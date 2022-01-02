const Router = require('express').Router
const service = require('./service')
const { ServerError } = require('../../utils/error')
const middleware = require('../../utils/middleware')

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await service.get())
})

router.post('/', middleware.authGuard, async (req, res) => {
  const { title, author, url, likes } = req.body
  const user = req.user

  if (title == null && url == null) throw new ServerError('Missing post title and URL', 400)

  const newEntry = await service.create({ title, author, url, userId: user.id, likes: likes ?? 0 })

  res.status(201).json(newEntry)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  res.json(await service.getById({ id }))
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body

  if (title == null && url == null) throw new ServerError('Missing post title and URL', 400)

  const entry = await service.update({ id, title, author, url, likes: likes ?? 0 })

  res.json(entry)
})

router.delete('/:id', middleware.authGuard, async (req, res) => {
  const { id } = req.params
  const user = req.user

  await service.remove({ id, userId: user.id })

  res.status(204).end()
})

module.exports = router
