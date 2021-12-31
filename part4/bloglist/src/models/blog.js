const mongoose = require('mongoose')
const config = require('../utils/config')
const log = require('../utils/logger')

const url = config.MONGODB_URI

log.info(`Connecting to MongoDB`)

mongoose
  .connect(url)
  .then((_result) => {
    log.info('Connected to MongoDB')
  })
  .catch((error) => {
    log.info('Error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Blog', blogSchema)
