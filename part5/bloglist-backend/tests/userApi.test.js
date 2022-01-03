const supertest = require('supertest')
const app = require('../src/app')
const helpers = require('./helpers')

const api = supertest(app)

beforeEach(helpers.initDatabase)

describe('GET /users', () => {
  test(
    'users are returned as json without password',
    async () => {
      const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).not.toContainEqual({ password: RegExp(/.*/) })
    },
    helpers.WAIT_TIME,
  )
})

describe('POST /users', () => {
  test(
    'new users can be added',
    async () => {
      const { name, username } = helpers.newUser
      const response = await api
        .post('/api/users')
        .send(helpers.newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toMatchObject({ name, username })

      const atEnd = await helpers.usersInDb()
      expect(atEnd).toHaveLength(helpers.initialUsers.length + 1)

      const usernames = helpers.initialUsers.map(({ username }) => username)
      const contents = atEnd.find((e) => !usernames.includes(e.username))
      expect(contents).toMatchObject({ name, username })
    },
    helpers.WAIT_TIME,
  )

  test(
    'username needs to be unique',
    async () => {
      await api
        .post('/api/users')
        .send(helpers.initialUsers[0])
        .expect(400)
        .expect('Content-Type', /application\/json/)
    },
    helpers.WAIT_TIME,
  )

  test(
    'username and password are required',
    async () => {
      const { name, username, password } = helpers.newUser
      let response = await api
        .post('/api/users')
        .send({ name, username })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.message).toBe('Username or password missing')

      response = await api
        .post('/api/users')
        .send({ name, password })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.message).toBe('Username or password missing')
    },
    helpers.WAIT_TIME,
  )

  test(
    'password minimum length',
    async () => {
      const { name, username } = helpers.newUser
      const response = await api
        .post('/api/users')
        .send({ name, username, password: 'a' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(response.body.message).toBe('Password has less than 3 characters')
    },
    helpers.WAIT_TIME,
  )
})

afterAll(helpers.closeDatabase)
