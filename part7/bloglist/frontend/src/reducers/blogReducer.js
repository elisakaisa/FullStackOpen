import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        likeBlog(state, action) {
            const likedBlog = action.payload;
            const { id } = likedBlog;
            return state.map((blog) =>
              blog.id !== id ? blog : likedBlog
            )
          },
          appendBlog(state, action) {
            state.push(action.payload)
          },
          setBlogs(state, action) {
            return action.payload
          },
          removeBlog(state, action) {
            console.log(action.payload)
            return state.filter(blog => (blog.id !== action.data.id))
        }
    }
})

export const { likeBlog, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }
}

export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`Successfully added ${newBlog.title} by author ${newBlog.author}`, 5))
    }
  }
  
  export const voteBlog = (blog) => {
    return async dispatch => {
      const likedBlog = await blogService.updateLike(blog)
      dispatch(likeBlog(likedBlog))
      dispatch(setNotification('Blog liked', 5))
    }
  }

  export const deleteBlog = (id) => {
    console.log(id)
    return async dispatch => {
        const response = await blogService.removeBlog(id)
        console.log('response', response)
        
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
        dispatch(setNotification('Blog successfully removed', 5))
    }
  }
  
  export default blogSlice.reducer
