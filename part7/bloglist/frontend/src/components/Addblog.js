import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import styled from 'styled-components'

const Button = styled.button`
  background: lightcyan;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid midnightblue;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

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
    }

    return (
        <form onSubmit={addBlog}>
            <div className="form">
                title:
                <Input
                    id="title"
                    value={newTitle}
                    name="title"
                    onChange={({ target }) => setNewTitle(target.value)}
                />
            </div>
            <div>
                author:
                <Input
                    id="author"
                    value={newAuthor}
                    name="author"
                    onChange={({ target }) => setNewAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <Input
                    id="url"
                    value={newUrl}
                    name="url"
                    onChange={({ target }) => setNewUrl(target.value)}
                />
            </div>
            <Button id="addBlog" type="submit">
                create
            </Button>
        </form>
    )
}
export default Addblog
