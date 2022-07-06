import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = {
    id: null,
    name: null,
    token: null,
    username: null
  }

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        loginUser(state, action) {
            return action.payload
        },
        logoutUser(state, action) {
            return initialState
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions

// login from user action
export const loginAction = ({ username, password}) => {
    return async dispatch => {
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

            dispatch(loginUser((user)))
            dispatch(setNotification(`Successfully logged in as ${user.name}!`, 5))
        } catch (exception) {
            dispatch(setNotification('Wrong credentials', 5))
        }
    }
}

// login from saved state
export const loginActionWindow = (user) => {
    return async dispatch => {

            window.localStorage.setItem(
                'loggedBlogAppUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)

            dispatch(loginUser((user)))
    }
}
  

export const logoutAction = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')
        blogService.setToken(null)
        dispatch(logoutUser())
    }
}


export default userSlice.reducer