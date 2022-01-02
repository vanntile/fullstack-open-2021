const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./helpers')

const api = supertest(app)

beforeEach(helpers.initDatabase)

describe('GET /blogs', () => {
  test(
    'blogs are returned as json',
    async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    },
    helpers.WAIT_TIME,
  )

  test(
    'correct number of blogs',
    async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helpers.initialBlogs.length)
    },
    helpers.WAIT_TIME,
  )
})

describe('GET /blogs/:id', () => {
  test(
    'blogs have an `id` property',
    async () => {
      const blogsAtStart = await helpers.blogsInDb()
      const response = await api.get(`/api/blogs/${blogsAtStart[0].id}`)
      expect(response.body).toBeDefined()
    },
    helpers.WAIT_TIME,
  )
})

describe('POST /blogs', () => {
  test(
    'new posts can be added',
    async () => {
      const user = helpers.initialUsers[0]
      const { username, password } = user

      let response = await api.post('/api/login').send({ username, password }).expect(200)
      expect(response.body.token).toBeDefined()

      response = await api
        .post(`/api/blogs`)
        .send({ ...helpers.newPost })
        .set({ Authorization: `Bearer ${response.body.token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toMatchObject(helpers.newPost)

      const blogsAtEnd = await helpers.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length + 1)

      const authors = helpers.initialBlogs.map(({ author }) => author)
      const contents = blogsAtEnd.find(({ author }) => !authors.includes(author))
      expect(contents).toMatchObject(helpers.newPost)
    },
    helpers.WAIT_TIME,
  )

  test(
    'likes default value is 0',
    async () => {
      const user = helpers.initialUsers[0]
      const { username, password } = user

      let response = await api.post('/api/login').send({ username, password }).expect(200)
      expect(response.body.token).toBeDefined()

      const { title, author } = helpers.newPost
      response = await api
        .post(`/api/blogs`)
        .send({ title, author })
        .set({ Authorization: `Bearer ${response.body.token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBe(0)
    },
    helpers.WAIT_TIME,
  )

  test(
    'missing title and url returns client error',
    async () => {
      const user = helpers.initialUsers[0]
      const { username, password } = user

      let response = await api.post('/api/login').send({ username, password }).expect(200)
      expect(response.body.token).toBeDefined()

      const { author, likes } = helpers.newPost
      await api
        .post(`/api/blogs`)
        .send({ author, likes })
        .set({ Authorization: `Bearer ${response.body.token}` })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    },
    helpers.WAIT_TIME,
  )

  test(
    'missing authorization token returns unauthorized error',
    async () => {
      await api
        .post(`/api/blogs`)
        .send({ ...helpers.newPost })
        .expect(401)
        .expect('Content-Type', /application\/json/)
    },
    helpers.WAIT_TIME,
  )
})

describe('PUT /blogs/:id', () => {
  test(
    'update existing post',
    async () => {
      const blogsAtBeginning = await helpers.blogsInDb()
      const id = blogsAtBeginning[0].id
      const response = await api
        .put(`/api/blogs/${id}`)
        .send(helpers.newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toMatchObject(helpers.newPost)
    },
    helpers.WAIT_TIME,
  )

  test(
    'invalid update object',
    async () => {
      const blogsAtBeginning = await helpers.blogsInDb()
      const id = blogsAtBeginning[0].id
      const { author, likes } = helpers.newPost
      await api
        .put(`/api/blogs/${id}`)
        .send({ author, likes })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    },
    helpers.WAIT_TIME,
  )
})

describe('DELETE /blogs/:id', () => {
  test(
    'delete existing post',
    async () => {
      const user = helpers.initialUsers[0]
      const { username, password } = user

      const response = await api.post('/api/login').send({ username, password }).expect(200)
      expect(response.body.token).toBeDefined()

      const blogsAtBeginning = await helpers.blogsInDb()
      const id = blogsAtBeginning[0].id
      await api
        .delete(`/api/blogs/${id}`)
        .set({ Authorization: `Bearer ${response.body.token}` })
        .expect(204)

      const blogsAtEnd = await helpers.blogsInDb()
      expect(blogsAtEnd.map(({ id }) => id)).not.toContain(id)
    },
    helpers.WAIT_TIME,
  )

  test(
    'delete by another user refused',
    async () => {
      const user = helpers.initialUsers[1]
      const { username, password } = user

      const response = await api.post('/api/login').send({ username, password }).expect(200)
      expect(response.body.token).toBeDefined()

      const blogsAtBeginning = await helpers.blogsInDb()
      const id = blogsAtBeginning[0].id
      await api
        .delete(`/api/blogs/${id}`)
        .set({ Authorization: `Bearer ${response.body.token}` })
        .expect(401)
    },
    helpers.WAIT_TIME,
  )

  test(
    'missing authorization token returns unauthorized error',
    async () => {
      const blogsAtBeginning = await helpers.blogsInDb()
      const id = blogsAtBeginning[0].id
      await api.delete(`/api/blogs/${id}`).expect(401)
    },
    helpers.WAIT_TIME,
  )
})

afterAll(helpers.closeDatabase)
