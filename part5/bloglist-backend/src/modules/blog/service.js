const Blog = require('../../models/blog')
const User = require('../../models/user')
const { ServerError } = require('../../utils/error')

const get = async () => await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

const getById = async ({ id }) => {
  const entry = await Blog.find({ id }).populate('user', { username: 1, name: 1, id: 1 })

  if (!entry) throw new ServerError(`Blog does not exist with id ${id}`, 404)

  return entry
}

const create = async (data) => {
  const userId = data.userId

  const user = await User.findById(userId)

  const entry = await new Blog({ ...data, user: user._id }).save()

  user.blogs = user.blogs.concat(entry._id)
  await user.save({ validateModifiedOnly: true })

  return await Blog.findById(entry.id).populate('user', { username: 1, name: 1, id: 1 })
}

const update = async ({ id, title, author, url, likes }) => {
  await Blog.updateOne({ _id: id }, { title, author, url, likes }, { runValidators: true })

  return await Blog.findById(id).populate('user', { username: 1, name: 1, id: 1 })
}

const remove = async ({ id, userId }) => {
  const user = await User.findById(userId)

  const blog = await Blog.findById(id)

  if (user.id.toString() !== blog.user.toString()) throw new ServerError(`User is not post's owner`, 401)

  await Blog.deleteOne({ _id: id })
}

module.exports = { get, getById, create, update, remove }
