import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => (await axios.get(baseUrl)).data

const postNew = async (newPost) => (await axios.post(baseUrl, newPost, { headers: { Authorization: token } })).data

const methods = {
  setToken,
  getAll,
  postNew,
}

export default methods
