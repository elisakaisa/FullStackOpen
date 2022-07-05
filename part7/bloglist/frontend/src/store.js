import { configureStore } from '@reduxjs/toolkit'

// internal imports
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      notifications: notificationReducer
    }
})

export default store