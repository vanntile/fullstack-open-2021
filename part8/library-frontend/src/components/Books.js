import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_BOOKS } from '../graphql'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

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
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
