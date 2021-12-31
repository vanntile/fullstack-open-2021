const Blog = require('../../models/blog')

const get = async () => await Blog.find({})

const create = async (data) => await new Blog(data).save()

module.exports = { get, create }
