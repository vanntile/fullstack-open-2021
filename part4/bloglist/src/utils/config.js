require('dotenv').config()

const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGODB_URI = process.env.MONGODB_URI || ''

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
}
