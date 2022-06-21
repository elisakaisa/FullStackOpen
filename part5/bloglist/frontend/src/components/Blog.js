import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrorMessage, deleteBlog, user }) => {

  // styling
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // useState
  const [visibility, setVisibility] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  // Like blog
  const onLike = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.updateLike(blog)
      if (response.hasOwnProperty('error')) {
        setErrorMessage(response.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        setLikes(likes + 1)
      }
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}</p>

      {visibility &&
          <div>
            <button onClick={() => setVisibility(false)}>Hide details</button>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>
              {blog.likes} likes
              <button onClick={onLike}>Like</button>
            </p>
            {blog.user !== null &&
              <p>added by {blog.user.name}</p>
            }
            {((blog.user !== null) && (blog.user.id === user.id)) &&
              <button onClick={() => deleteBlog(blog)}>remove</button>
            }
          </div>
      }
      {!visibility &&
          <button onClick={() => setVisibility(true)}>View details</button>
      }
    </div>
  )
}

export default Blog