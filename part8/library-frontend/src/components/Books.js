import { useQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../graphql'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')

  useEffect(() => {
    if (result.data?.allBooks) {
      const g = [...new Set(result.data.allBooks.map((e) => e.genres).flat())].sort()
      setGenres(g)
      setGenre(g[0])
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return result.loading ? (
    <div>books loading...</div>
  ) : (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {result.data.allBooks
            .filter((b) => b.genres.includes(genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <select value={genre} onChange={({ target }) => setGenre(target.value)}>
        {genres.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Books
