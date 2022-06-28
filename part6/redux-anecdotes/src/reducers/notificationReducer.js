import { createSlice } from '@reduxjs/toolkit'

const initialState = null


const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return null
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return async (dispatch) => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, (timeout*1000))
    }
}
export default notificationSlice.reducer