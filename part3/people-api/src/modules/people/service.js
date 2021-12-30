const { ServerError } = require('../../utils/error')
const Person = require('../../models/person')

const get = async () => await Person.find({})

const count = async () => await Person.countDocuments({})

const getById = async ({ id }) => {
  const person = await Person.findById(id)

  if (!person) throw new ServerError(`Person does not exist with id ${id}`, 404)

  return person
}

const create = async ({ name, number }) => await new Person({ name, number }).save()

const update = async ({ id, name, number }) =>
  await Person.updateOne({ _id: id }, { name, number }, { runValidators: true })

const remove = async ({ id }) => await Person.deleteOne({ _id: id })

module.exports = {
  get,
  count,
  getById,
  create,
  update,
  remove,
}
