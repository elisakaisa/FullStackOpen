import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Addblog from './components/Addblog'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import './index.css'

const App = () => {

  const dispatch = useDispatch()

    // STATES
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    // Ref
    const addBlogRef = useRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(
                (blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)) // descending order
            )
            .catch((error) => {
              dispatch(setNotification(error.response.data.error, 5))
            })
    }, [])

    // fetch user from local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    // LOGIN
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            // save user  token to local storage
            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')

            dispatch(setNotification(`Successfully logged in as ${user.name}!`, 5))
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 5))
        }
    }

    // LOGOUT
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        dispatch(setNotification('Successfully logged out!', 5))
    }

    // delete blog
    const deleteBlog = async (blog) => {
        if (
            !window.confirm(`Do you want to remove the blog "${blog.title}"?`)
        ) {
            return
        }
        try {
            const response = await blogService.removeBlog(blog.id)
            if ({}.hasOwnProperty.call(response, 'error')) {
              dispatch(setNotification(response.error, 5))
            } else {
                setBlogs(blogs.filter((b) => b.id !== blog.id))
            }
        } catch (error) {
          dispatch(setNotification(error, 5))
        }
    }

    return (
        <div>
            <h1>Blog App</h1>
            <Notification />

            {user === null ? (
                <Togglable buttonLabel="login">
                    <Loginform
                        handleLogin={handleLogin}
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) =>
                            setUsername(target.value)
                        }
                        handlePasswordChange={({ target }) =>
                            setPassword(target.value)
                        }
                    />
                </Togglable>
            ) : (
                <div>
                    <p>
                        {user.name} is logged in
                        <button onClick={handleLogout}>Logout</button>
                    </p>
                    <Togglable buttonLabel="add new blog" ref={addBlogRef}>
                        <Addblog
                            blogService={blogService}
                            blogs={blogs}
                            setBlogs={setBlogs}
                        />
                    </Togglable>
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            deleteBlog={deleteBlog}
                            user={user}
                            blogService={blogService}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
