const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
            born: null,
            bookCount: 1
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
        else {
            author.bookCount = author.bookCount + 1
            await author.save()
        }
  
        const book = new Book({...args, author})
        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        // subscription
        pubsub.publish("BOOK_ADDED", { bookAdded: book })

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
    },

    // Subscription
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
      },
  }

module.exports = resolvers