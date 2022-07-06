import React, { useState } from 'react'
import { voteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user, deleteBlog }) => {
    // styling
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const dispatch = useDispatch()

    // useState
    const [visibility, setVisibility] = useState(false)

    // Like blog
    const onLike = async (event) => {
        event.preventDefault()
        console.log('onLike: blog: ', blog)
        dispatch(voteBlog(blog))
    }

    return (
        <div style={blogStyle} className="blog">
            {blog.title} by {blog.author}
            {visibility && (
                <div>
                    <button onClick={() => setVisibility(false)}>
                        Hide details
                    </button>
                    <p>
                        <a href={blog.url}>{blog.url}</a>
                    </p>
                    <p>
                        {blog.likes} likes
                        <button onClick={onLike}>Like</button>
                    </p>
                    {blog.user !== null && <p>added by {blog.user.name}</p>}
                    {blog.user !== null && blog.user.id === user.id && (
                        <button onClick={() => deleteBlog(blog)}>remove</button>
                    )}
                </div>
            )}
            {!visibility && (
                <button onClick={() => setVisibility(true)}>
                    View details
                </button>
            )}
        </div>
    )
}

export default Blog
