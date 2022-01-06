import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => (await axios.post(baseUrl, credentials)).data

const methods = { login }

export default methods
