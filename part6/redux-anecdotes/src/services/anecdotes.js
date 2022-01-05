import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => (await axios.get(baseUrl)).data

const create = async (x) => (await axios.post(baseUrl, x)).data

export default { getAll, create }
