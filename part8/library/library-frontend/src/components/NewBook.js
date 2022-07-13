import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS, ME } from '../queries'



const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const meResult = useQuery(ME)

  const [createBook] = useMutation(CREATE_BOOK, {
    //refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    update: (cache, response) => {
      console.log('cache', cache)
      console.log('response', response)
      //FIXME: fix this 
      cache.updateQuery({ query: ALL_BOOKS }, ( {allBooks} ) => {
        console.log('add book', allBooks)
        return {
          allBooks: allBooks.concat(response.data.addPerson),
        }
      })
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({variables: { title, author, published: Number(published), genres}})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
