const Router = require('express').Router
const blogService = require('./service')

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await blogService.get())
})

router.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body

  const newEntry = await blogService.create({ title, author, url, likes })

  res.status(201).json(newEntry)
})

module.exports = router
