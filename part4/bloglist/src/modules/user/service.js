const User = require('../../models/user')

const get = async () => await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

const getById = async ({ id }) => {
  const entry = await User.find({ id })

  if (!entry) throw new ServerError(`User does not exist with id ${id}`, 404)

  return entry
}

const create = async (data) => await new User(data).save()

module.exports = { get, getById, create }
