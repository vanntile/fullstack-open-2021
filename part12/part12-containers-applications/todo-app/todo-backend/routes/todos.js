const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const counter = (await redis.getAsync('counter')) ?? 0
  await redis.setAsync('counter', Number(counter) + 1)

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })
  res.send(todo)
})

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', (req, res) => {
  res.json(req.todo)
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body
  const { _id } = req.todo

  await Todo.updateOne({ _id }, { text, done })
  const todo = await Todo.findById(_id)

  res.json(todo)
})

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
