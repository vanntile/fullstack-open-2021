import { ApolloServer, gql } from 'apollo-server'
import { v1 as uuid } from 'uuid'
import { defaultAuthors, defaultBooks } from './data.js'

let authors = [...defaultAuthors]
let books = [...defaultBooks]

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
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => books.filter((e) => e.author === root.name).length,
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      const b = args.author ? books.filter((e) => e.author === args.author) : books
      return args.genre ? b.filter((e) => e.genres.includes(args.genre)) : b
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find((e) => e.name === args.author)) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((e) => e.name === args.name)
      if (!author) return null
      author.born = args.setBornTo
      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
