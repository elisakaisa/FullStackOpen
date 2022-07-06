import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'

// Components
import Notification from './components/Notification'
import Addblog from './components/Addblog'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import {
    loginAction,
    loginActionWindow,
} from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import './index.css'
import UserList from './components/UserList'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import BlogList from './components/BlogList'
import Menu from './components/Menu'
import styled from 'styled-components'

// STYLING
const Navigation = styled.div`
background: powderblue;
padding: 1em;
`
const Page = styled.div`
  padding: 1em;
  background: mintcream;
`


const App = () => {
    const dispatch = useDispatch()

    // STATES
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector((state) => state.user)

    // Ref
    const addBlogRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])
    const blogs = useSelector((state) => state.blogs)
    const users = useSelector((state) => state.users)

    // fetch user from local storage
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(loginActionWindow(user))
        }
    }, [dispatch])

    // individual user page
    const userMatch = useMatch('/user/:id')
    const viewUser = userMatch
        ? users.find((u) => u.id === userMatch.params.id)
        : null

    // individual blog page
    const blogMatch = useMatch('/blog/:id')
    const viewBlog = blogMatch
        ? blogs.find((b) => b.id === blogMatch.params.id)
        : null

    // LOGIN
    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(loginAction({ username, password }))
        setUsername('')
        setPassword('')
    }

    

    return (
        <Page className="container">
            {user.name === null ? (
                <div>
                    <h1>Blog App</h1>
                    <Notification />
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
                </div>
            ) : (
                <div>
                    <Navigation><Menu /></Navigation>
                    <h1>Blog App</h1>
                    <Notification />
                    <Routes>
                        <Route path="/users" element={<UserList />}></Route>
                        <Route
                            path="/"
                            element={
                                <div>
                                    <Togglable
                                        buttonLabel="add new blog"
                                        ref={addBlogRef}
                                    >
                                        <Addblog />
                                    </Togglable>
                                    <BlogList />
                                </div>
                            }
                        ></Route>
                        <Route
                            path="/user/:id"
                            element={<UserView user={viewUser} />}
                        ></Route>
                        <Route
                            path="/blog/:id"
                            element={<BlogView blog={viewBlog} />}
                        ></Route>
                    </Routes>
                </div>
            )}
        </Page>
    )
}

export default App
