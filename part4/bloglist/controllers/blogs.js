const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})



// add blog
blogsRouter.post('/', async (request, response) => {
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

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


// delete blog post
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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