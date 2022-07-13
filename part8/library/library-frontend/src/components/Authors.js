import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState()
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  // required for making sure the app works when editing the birth year of the first author
  useEffect(() => {
    if (!result.loading) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result.loading])  // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const updatedAuthor = {
        variables: {
          name,
          setBornTo: Number(born)
        }
      }
    console.log(updatedAuthor)
    editBirthYear(updatedAuthor)

    setBorn('')
}
  

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    <select value={name} onChange={({ target }) => setName(target.value)}>
                        {authors.map(a =>
                            <option key={a.name} value={a.name}>
                                {a.name}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                        />
                </div>
                <button type="submit">update author</button>
            </form>

    </div>
  )
}

export default Authors
