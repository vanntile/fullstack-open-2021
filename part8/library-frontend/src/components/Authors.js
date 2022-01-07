import { useQuery } from '@apollo/client'
import React from 'react'
import { ALL_AUTHORS } from '../graphql'
import AuthorUpdate from './AuthorUpdate'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  return result.loading ? (
    <div>loading authors...</div>
  ) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorUpdate authors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
