import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS, UNIQUE_GENRES } from '../queries'


const Books = (props) => {
  
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS,  {
    variables: {genre: filter}
  })
  const genres = useQuery(UNIQUE_GENRES)
  
  if (result.loading || genres.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const uniqueGenres = genres.data.uniqueGenres

  return (
    <div>
      <h2>books</h2>
      <p>books in the genre <strong>{filter}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {uniqueGenres.map(genre =>
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setFilter('')}>all genres</button>

    </div>
  )
}

export default Books
