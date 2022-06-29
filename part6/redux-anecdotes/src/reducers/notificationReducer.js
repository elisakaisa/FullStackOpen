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

let timeoutID = null

export const setNotification = (message, timeout) => {
    return async (dispatch) => {
        dispatch(showNotification(message))

        // if timer already going: clear it
        if (timeoutID) {
            clearTimeout(timeoutID);
        }

        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, (timeout*1000))
    }
}
export default notificationSlice.reducer