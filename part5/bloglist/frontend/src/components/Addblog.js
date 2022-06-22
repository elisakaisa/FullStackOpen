import React, { useState } from 'react'

const Addblog = ({ blogService, setErrorMessage, blogs, setBlogs, setNotificationMessage }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // ADD BLOG
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: 0,
      })
      if ({}.hasOwnProperty.call(newBlog, 'error')) {
        setErrorMessage(newBlog.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      else {
        setBlogs([...blogs, newBlog])
        setNotificationMessage(
          `Added blog "${newBlog.title}" by author "${newBlog.author}"`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    }
    catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div className='form'>
        title:
        <input
          id='title'
          value={newTitle}
          name='title'
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          value={newAuthor}
          name='author'
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          value={newUrl}
          name='url'
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button id='addBlog' type="submit">create</button>
    </form>
  )
}
export default Addblog