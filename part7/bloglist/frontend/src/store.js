import { configureStore } from '@reduxjs/toolkit'

// internal imports
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
    reducer: {
      notifications: notificationReducer,
      blogs: blogReducer,
      user: loginReducer,
      users: usersReducer
    }
})

export default store