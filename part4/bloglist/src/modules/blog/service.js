const Blog = require('../../models/blog')

const get = async () => await Blog.find({})

const getById = async ({ id }) => {
  const entry = await Blog.find({ id })

  if (!entry) throw new ServerError(`Blog does not exist with id ${id}`, 404)

  return entry
}

const create = async (data) => await new Blog(data).save()

const update = async ({ id, title, author, url, likes }) => {
  await Blog.updateOne({ _id: id }, { title, author, url, likes }, { runValidators: true })

  return await Blog.findOne({ id })
}

const remove = async ({ id }) => await Blog.deleteOne({ _id: id })

module.exports = { get, getById, create, update, remove }
