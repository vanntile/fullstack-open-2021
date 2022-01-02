require('dotenv').config()

const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGODB_URI = NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  SECRET,
}
