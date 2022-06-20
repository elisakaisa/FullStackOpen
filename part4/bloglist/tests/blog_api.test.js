const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')


// initialize the database before the tests
beforeAll(async () => {
  await Blog.deleteMany({})
  //await User.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  // DO NOT DO THIS, otherwise always new user ID!!!
  //let userObject = new User(helper.initialUsers[0])
  //await userObject.save()
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

    const initBlogsWithNullUser = helper.initialBlogs.map(blog => {
      const newBlog = { ...blog }
      newBlog.user = null  // these are faked in fixture data so they do not populate
      return newBlog
    })

    expect(body).toEqual(initBlogsWithNullUser)
  })

  test('correct amount of data', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
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

    const blogsAtStart = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length + 1)
  })

  test('blog without likes input gets default value 0', async () => {

    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length -1].likes).toEqual(0)
  })

  test('blog without title or author is added', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    const newBlog = {
      url: 'http://www.someurl.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })

  test('blog cannot be added if token is not provided', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})






describe('actions on individual notes', () => {

  test('Own blog can be removed', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('Not own blog cannot be removed', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const usersAtStart = await helper.usersInDb()
    const token = helper.getTokenForUser(usersAtStart[0])

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

  })

  test('likes can be modified', async () => {

    const blogsAtStart = await helper.blogsInDb()

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 100,
      user: '62b058a9cda8e9225951e41f'
    }
    const response = await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(updatedBlog)

    // Make sure it uses the existing ID
    expect(response.body.id).toBe(blogsAtStart[0].id)

    // Remove ID and make sure the rest of the properties have the updated data
    delete response.body.id // match format
    expect(response.body).toEqual(updatedBlog)

    // same amount of blogs as before
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)

    // check that likes have been updated
    expect(blogsAtEnd[0].likes).toEqual(updatedBlog.likes)

  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'unique',
      name: 'Matti uijabsdsdfifbu',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is less than 4 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'unique name',
      name: 'Superuser',
      password: 'sal',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'unique name2',
      name: 'Superuser',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'uisfibsib'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})



afterAll(() => {
  mongoose.connection.close()
})