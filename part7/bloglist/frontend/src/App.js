import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
import { initializeBlogs, deleteBlog } from './reducers/blogReducer'
import { loginAction, loginActionWindow, logoutAction } from './reducers/userReducer'
import './index.css'

const App = () => {

  const dispatch = useDispatch()

    // STATES
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)

    // Ref
    const addBlogRef = useRef()

    useEffect(() => {
      dispatch(initializeBlogs())
    }, [dispatch])
    const blogs = useSelector(state => state.blogs)

    // fetch user from local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        console.log('loggedin user', loggedUserJSON)
        
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            //setUser(user)
            //blogService.setToken(user.token)
            console.log('user', user)
            dispatch(loginActionWindow(user))
            console.log('user', user)
            
        }
    }, [dispatch])

    // LOGIN
    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginAction({ username, password }))
        setUsername('')
        setPassword('')
    }

    // LOGOUT
    const handleLogout = () => {
        console.log('logout pressed')
        dispatch(logoutAction())
        dispatch(setNotification('Successfully logged out!', 5))
    }

    // delete blog
    const deleteBlog2 = async (blog) => {
      if (window.confirm(`Do you want to remove the blog "${blog.title}"?`)) {
        dispatch(deleteBlog(blog.id))
      } 
  }

    return (
        <div>
            <h1>Blog App</h1>
            <Notification />

            {user.name === null ? (
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
                        <Addblog />
                    </Togglable>
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            deleteBlog={deleteBlog2}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default App
