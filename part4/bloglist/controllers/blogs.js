const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.toJSON())
})


// add blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // Check token
  if (!request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // check content
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  // get user
  const user = await User.findById(request.decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  // blog's id added to the user
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


// delete blog post
blogsRouter.delete('/:id', async (request, response) => {

  // Check token
  if (!request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToRemove = await Blog.findById(request.params.id)
  if (!blogToRemove) {
    return response.status(400).json({ error: 'Blog id is invalid' })
  }

  console.log('blog to remove id', blogToRemove.user.toString())
  console.log('decoded Token id', request.decodedToken.id.toString())
  if (blogToRemove.user.toString() === request.decodedToken.id.toString()) {
    // Only delete if user and blog user are the same
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  else {
    // If not then throw an error
    console.log('is this the error thrown?')
    return response.status(400).json({ error: 'Blog can only be deleted by the user who posted it' })
  }
})

// modify information
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  }

  if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  return response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter