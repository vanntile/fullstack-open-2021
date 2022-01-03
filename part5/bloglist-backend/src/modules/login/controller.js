const bcrypt = require('bcrypt')
const Router = require('express').Router
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const config = require('../../utils/config')

const router = Router()

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const { username, password, name } = user

  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, password)

  if (!(user && passwordCorrect)) res.status(401).json({ message: 'invalid username or password' })
  else {
    const token = jwt.sign({ username, id: user._id }, config.SECRET)

    res.status(200).send({ token, username, name })
  }
})

module.exports = router
