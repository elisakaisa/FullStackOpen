const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { uniqueId } = require('lodash')
const _ = require('lodash')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
require('dotenv').config()
const config = require('./utils/config')
const jwt = require('jsonwebtoken')

const mongoose_url = config.MONGODB_URI
console.log('connecting to', mongoose_url)

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.connect(mongoose_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int #needs to be defined here for the query
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
    favouriteGenre: String!
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
    uniqueGenres: [String!]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor (
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async() => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books
        if (!args.genre) { 
            return await Book.find({}).populate('author') 
        }
        
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author') 
    },
    allAuthors: async () => {
      return Author.find({})
      /*
      const bookCountBy = _.countBy(books, book => book.author) TODO: fix
      return authors.,
      map(author => ({...author, bookCount: bookCountBy[author.name]})) */
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    uniqueGenres: async () => {
      const books = await Book.find({})
      let uniqueGenres = []
      books.forEach(book => {
        uniqueGenres = uniqueGenres.concat(book.genres)
      })
      return [...new Set(uniqueGenres)]
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("Missing Authentication Token")
      }

      let author = await Author.findOne({ name: args.author })
      console.log(author)
      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const book = new Book({...args, author})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
      
    },
    editAuthor: async (root, args, context) => {
      console.log(context)
      if (!context.currentUser) {
        throw new AuthenticationError("Missing Authentication Token")
      }

      const updatedAuthor = await Author.findOne({ name: args.name })
      updatedAuthor.born = args.setBornTo
      updatedAuthor.bookCount = Book.countDocuments({ author: updatedAuthor.id })

      try {
        await updatedAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return updatedAuthor
    },
    
    // LOGIN STUFF
    createUser: async (root, args) => {
      const user = new User({ ...args })
  
      try {
        await user.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})