const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


// initial blogs
const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

// helper function
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// initialize teh database before the tests
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('correct amount of blog posts in the JSON format', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('the blogs contain the correct data', async () => {
    const response = await api.get('/api/blogs')

    const body = response.body.map(blog => {
      //delete blog._id
      delete blog.id
      delete blog.__v
      return blog
    })

    expect(body).toEqual(initialBlogs)
  })

  test('correct amount of data', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('contains id', async() => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

})

describe('blog is added', () => {

  test('valid blog can be added', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('blog without likes input gets default value 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length -1].likes).toEqual(0)
  })

  test('blog without title or author is added', async () => {
    const newBlog = {
      url: 'http://www.someurl.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('actions on indivisual notes', () => {
  test('note can be removed', async () => {

    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('likes can be modified', async () => {

    const blogsAtStart = await blogsInDb()

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 100,
    }
    const response = await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(updatedBlog)

    // Make sure it uses the existing ID
    expect(response.body.id).toBe(blogsAtStart[0].id)

    // Remove ID and make sure the rest of the properties have the updated data
    delete response.body.id // match format
    expect(response.body).toEqual(updatedBlog)

    // same amount of blogs as before
    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    // check that likes have been updated
    expect(blogsAtEnd[0].likes).toEqual(updatedBlog.likes)

  })
})



afterAll(() => {
  mongoose.connection.close()
})