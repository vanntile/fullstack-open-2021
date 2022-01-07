import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../graphql'

const AuthorUpdate = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState(1900)

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, setBornTo: Number(year) } })

    setName('')
    setYear(1900)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((e) => (
            <option key={e.id} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <div>
          born <input type="number" value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type="submit">updateAuthor</button>
      </form>
    </div>
  )
}

export default AuthorUpdate
