const mongoose = require('mongoose')
const Blog = require('../src/models/blog')

const WAIT_TIME = 2 * 1000

const initialBlogs = [
  {
    author: 'Author 1',
    title: 'title 1',
    url: 'https://example.com',
    likes: 1,
  },
  {
    author: 'Author 2',
    title: 'title 2',
    url: 'https://example.com',
    likes: 2,
  },
]

const newPost = {
  author: 'Author 3',
  title: 'title 3',
  url: 'https://example.com',
  likes: 3,
}

const initDatabase = async () => {
  await Blog.deleteMany()

  await Promise.all(initialBlogs.map((b) => Blog(b).save()))
}

const closeDatabase = () => {
  mongoose.connection.close()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((e) => e.toJSON())
}

module.exports = {
  WAIT_TIME,
  newPost,
  initialBlogs,
  initDatabase,
  closeDatabase,
  blogsInDb,
}
