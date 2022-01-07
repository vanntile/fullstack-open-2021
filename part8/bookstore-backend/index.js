import { ApolloServer, gql, AuthenticationError, UserInputError } from 'apollo-server'
import jwt from 'jsonwebtoken'
import { Author, Book, User } from './src/models/index.js'
import config from './src/utils/config.js'
import './src/utils/initDatabase.js'

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Author: {
    bookCount: async (root) => await Book.collection.countDocuments({ author: root._id }),
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      const query = {}
      if (args.author) query.author = (await Author.findOne({ name: args.author }))._id
      if (args.genre) query.genres = args.genre

      return await Book.find(query).populate('author', { name: 1, born: 1 })
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('User unauthenticated')

      const { title, author, published, genres } = args
      let savedAuthor = await Author.findOne({ name: author })

      try {
        if (!savedAuthor) {
          const newAuthor = new Author({ name: author })
          savedAuthor = await newAuthor.save()
        }

        const entry = new Book({ title, published, genres, author: savedAuthor._id })

        const savedEntry = await entry.save()

        return await Book.findById(savedEntry._id).populate('author', { name: 1, born: 1 })
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError('User unauthenticated')

      return (await Author.findOne({ name: args.name }))
        ? await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { runValidators: true })
        : null
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== config.IGNORANT_PASSWORD) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
