import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BIRTH_YEAR, ALL_AUTHORS } from '../queries'

const BirthyearForm = ( {authors} ) => {
    const [name, setName] = useState()
    const [born, setBorn] = useState('')
    const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
      })


    const submit = async (event) => {
        event.preventDefault()

        editBirthYear({
            variables: {
              name,
              setBornTo: Number(born)
            }
          })

        setBorn('')
    }

    return (
        <div>
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

export default BirthyearForm