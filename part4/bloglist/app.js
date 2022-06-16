const express = require('express')
const app = express()
const cors = require('cors')

//module internal imports
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

// Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app