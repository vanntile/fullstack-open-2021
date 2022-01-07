import mongoose from 'mongoose'
import config from './config.js'

console.log(`Connecting to MongoDB`)

mongoose
  .connect(config.MONGODB_URI)
  .then((_result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`)
  })
