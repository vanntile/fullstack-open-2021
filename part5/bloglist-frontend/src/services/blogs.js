import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => (await axios.get(baseUrl)).data

const create = async (newPost) => (await axios.post(baseUrl, newPost, { headers: { Authorization: token } })).data

const update = async ({ id, ...updatedPost }) => (await axios.put(`${baseUrl}/${id}`, updatedPost)).data

const remove = async ({ id }) => await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })

const methods = {
  setToken,
  getAll,
  create,
  update,
  remove,
}

export default methods
