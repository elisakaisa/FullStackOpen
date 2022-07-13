import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../queries'

const RecommendedBooks = (props) => {
    const favouriteGenre = props.me

    const result = useQuery(ALL_BOOKS,  {
        variables: {genre: favouriteGenre}
    })
    
    if (!props.show) {
        return null
      }

      if (result.loading) {
        return <div>loading...</div>
      }
      const books = result.data.allBooks

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in you favourite genre: <strong>{favouriteGenre}</strong></p>

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
        </div>
    )

}

export default RecommendedBooks