import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = async () => {
  return await axios.get(baseUrl)
}

const create = async (newObject) => {
  return await axios.post(baseUrl, newObject)
}

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`)
}

const update = async (id, updatedObject) => {
  return await axios.put(`${baseUrl}/${id}`, updatedObject)
}

const service = {
  getAll,
  create,
  remove,
  update,
}

export default service
