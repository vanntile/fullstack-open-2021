const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Blog = require('../src/models/blog')
const User = require('../src/models/user')

const WAIT_TIME = 2 * 1000

const initialUsers = [
  {
    username: 'root',
    name: 'Administrator',
    password: 'secret',
  },
  {
    username: 'O5-1',
    name: 'Head of the council',
    password: 'secret',
  },
]

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

const newUser = {
  username: 'mekkanhe',
  name: 'The Broken God',
  password: 'initiator',
}

const newPost = {
  author: 'Author 3',
  title: 'title 3',
  url: 'https://example.com',
  likes: 3,
}

const initDatabase = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  initialUsers.forEach(async (user) => {
    user.password = await bcrypt.hash(user.password, 10)
  })

  await Promise.all(initialUsers.map((e) => User(e).save()))

  const user = await User.findOne({ username: 'root' })

  await Promise.all(initialBlogs.map((b) => Blog({ ...b, user: user._id }).save()))

  const blogs = await Blog.find({})
  blogs.forEach((blog) => {
    user.blogs = user.blogs.concat(blog._id)
  })

  await user.save({ validateModifiedOnly: true })
}

const closeDatabase = () => {
  mongoose.connection.close()
}

const blogsInDb = async () => (await Blog.find({})).map((e) => e.toJSON())

const usersInDb = async () => (await User.find({})).map((e) => e.toJSON())

module.exports = {
  WAIT_TIME,
  initialUsers,
  initialBlogs,
  newUser,
  newPost,
  initDatabase,
  closeDatabase,
  blogsInDb,
  usersInDb,
}
