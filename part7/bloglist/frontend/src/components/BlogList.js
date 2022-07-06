import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  // styling
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogs = useSelector(state => state.blogs)


  return (
    <div>
      <h2>Blogs</h2>
      <div id='bloglist'>
        {blogs.map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blog/${blog.id}`}>{blog.title} by {blog.author}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList 