const NODE_ENV = process.env.NODE_ENV || 'development'
const MONGODB_URI = NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const IGNORANT_PASSWORD = process.env.IGNORANT_PASSWORD
const SECRET = process.env.SECRET

const variables = {
  NODE_ENV,
  MONGODB_URI,
  IGNORANT_PASSWORD,
  SECRET,
}

export default variables
