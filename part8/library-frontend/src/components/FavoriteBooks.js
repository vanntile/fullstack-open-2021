import { useQuery, useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, GET_USER } from '../graphql'

const FavoriteBooks = (props) => {
  const user = useQuery(GET_USER)
  const [books, setBooks] = useState([])
  const [getBooks, { data: booksData }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!user.data?.me?.favoriteGenre) return
    getBooks({ variables: { genre: user.data.me.favoriteGenre } })
  }, [user.data]) // eslint-disable-line

  useEffect(() => {
    if (booksData) setBooks(booksData.allBooks)
  }, [booksData]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((b) => b.genres.includes(user.data.me.favoriteGenre))
            .map((a) => (
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

export default FavoriteBooks
