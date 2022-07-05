import { configureStore } from '@reduxjs/toolkit'

// internal imports
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
    reducer: {
      notifications: notificationReducer,
      blogs: blogReducer
    }
})

export default store