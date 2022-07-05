import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Addblog = () => {
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    // ADD BLOG
    const addBlog = async (event) => {
        event.preventDefault()
        dispatch(
            createBlog({
                title: newTitle,
                author: newAuthor,
                url: newUrl,
                likes: 0,
            })
        )
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')

        /*
        try {
            const newBlog = await blogService.create({
                title: newTitle,
                author: newAuthor,
                url: newUrl,
                likes: 0,
            })
            if ({}.hasOwnProperty.call(newBlog, 'error')) { 
              dispatch(setNotification(newBlog.error, 5))
             
            } else {
                setBlogs([...blogs, newBlog])

                dispatch(setNotification(`Added blog "${newBlog.title}" by author "${newBlog.author}"`, 5))
            }

            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
        } catch (error) {
            dispatch(setNotification(error, 5))
        } */
    }

    return (
        <form onSubmit={addBlog}>
            <div className="form">
                title:
                <input
                    id="title"
                    value={newTitle}
                    name="title"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    id="author"
                    value={newAuthor}
                    name="author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    id="url"
                    value={newUrl}
                    name="url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
            </div>
            <button id="addBlog" type="submit">
                create
            </button>
        </form>
    )
}
export default Addblog
