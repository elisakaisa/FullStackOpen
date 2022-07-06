import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteBlog, voteBlog } from '../reducers/blogReducer'

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    // delete blog
    const deleteBlog2 = async (blog) => {
        if (window.confirm(`Do you want to remove the blog "${blog.title}"?`)) {
            dispatch(deleteBlog(blog.id))
            navigate('/')
        }
    }

    // Like blog
    const onLike = async (event) => {
        event.preventDefault()
        console.log('onLike: blog: ', blog)
        dispatch(voteBlog(blog))
    }

    if (!blog) {
        return null
    }

    return (
        <div>
            <h2>
                {blog.title} by {blog.author}
            </h2>
            <p>{blog.info}</p>
            <p>
                {blog.likes} likes
                <button onClick={onLike}>Like</button>
            </p>
            <p>added by {blog.user.name}</p>
            <button onClick={() => deleteBlog2(blog)}>Delete</button>
        </div>
    )
}

export default BlogView
