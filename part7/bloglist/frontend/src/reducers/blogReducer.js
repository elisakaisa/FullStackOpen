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
          }
    }
})

export const { likeBlog, appendBlog, setBlogs } = blogSlice.actions

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
      dispatch(setNotification(`Successfully added ${newBlog.title} by author ${newBlog.author}`))
    }
  }
  
  export const voteBlog = (blog) => {
    return async dispatch => {
      const blogToLike = {
        ...blog,
        likes: blog.likes + 1
      }
      const likedBlog = await blogService.updateLikes(blogToLike)
      dispatch(likeBlog(likedBlog))
    }
  }
  
  export default blogSlice.reducer
