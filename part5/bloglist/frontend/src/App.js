
import React, { useState, useEffect, useRef } from 'react'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Addblog from './components/Addblog'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {

  // STATES
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [user, setUser] = useState(null)

  // Ref
  const addBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes)) // descending order
    )
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])

  // fetch user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
    }
  }, [])


  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // save user  token to local storage
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

      setNotificationMessage(
        `Successfully logged in as ${user.name}!`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // LOGOUT
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

    setNotificationMessage('Successfully logged out!')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  // Blog SERVICE
  const createBlog = (blogObject) => {
    addBlogRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setNotificationMessage(
          `${blogObject.title} was successfully added!`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // delete blog
  const deleteBlog = async (blog) => {
    if (!window.confirm(`Do you want to remove the blog "${blog.title}"?`)) {return}
    try {
      const response = await blogService.removeBlog(blog.id)
      if (response.hasOwnProperty('error')) {
        setErrorMessage(response.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } else {
        setBlogs(blogs.filter(b => (b.id !== blog.id)))
      }
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  return (
    <div>
      <h1>Blog App</h1>
      <Notification type='error' message={errorMessage} />
      <Notification type='success' message={notificationMessage} />

      {user === null ?
        <Togglable buttonLabel='login'>
          <Loginform
            handleLogin={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)} />
        </Togglable> :
        <div>
          <p>
            {user.name} is logged in
            <button onClick={handleLogout}>
              Logout
            </button>
          </p>
          <Togglable buttonLabel='add new blog' ref={addBlogRef}>
            <Addblog createBlog={createBlog}/>
          </Togglable>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} deleteBlog={deleteBlog} user={user} />
          )}
        </div>
      }
    </div>
  )
}

export default App