import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteBlog, voteBlog, addComment } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
    background: lightcyan;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid midnightblue;
    border-radius: 3px;
`

const BlogView = ({ blog }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')

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

    // comment blog
    const onComment = async (event) => {
        event.preventDefault()
        dispatch(addComment(blog, comment))
        setComment('')
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
                <Button onClick={onLike}>Like</Button>
            </p>
            <p>added by {blog.user.name}</p>
            <Button onClick={() => deleteBlog2(blog)}>Delete</Button>
            <h3>Comments</h3>
            <form onSubmit={onComment}>
                <input
                    id="comment"
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button id="addComment" type="submit">
                    Add comment
                </Button>
            </form>
            <ul>
                {blog.comments.map((comment) => (
                    <li key={comment}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default BlogView
