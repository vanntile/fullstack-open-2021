const bcrypt = require('bcrypt')
const Router = require('express').Router
const service = require('./service')
const { ServerError } = require('../../utils/error')

const router = Router()

router.get('/', async (_req, res) => {
  res.json(await service.get())
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (username == null || password == null) throw new ServerError('Username or password missing', 400)
  if (password.length <= 3) throw new ServerError('Password has less than 3 characters', 400)

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const entry = await service.create({ username, name, password: hashedPassword })

  res.status(201).json(entry)
})

module.exports = router
