const { ServerError } = require('../../utils/error')
let { people } = require('../../utils/data')

const get = () => people

const count = () => people.length

const getById = ({ id }) => {
  const person = people.find((p) => p.id == id)

  if (!person) throw new ServerError(`Person does not exist with id ${id}`, 404)

  return person
}

const create = ({ name, number }) => {
  if (people.find((e) => e.name === name)) throw new ServerError(`Name '${name}' already exists`, 400)

  const newEntry = { id: Math.floor(Math.random() * 10 ** 12), name, number }
  people.push(newEntry)

  return newEntry
}

const remove = ({ id }) => {
  people = people.filter((e) => e.id != id)
}

module.exports = {
  get,
  count,
  getById,
  create,
  remove,
}
