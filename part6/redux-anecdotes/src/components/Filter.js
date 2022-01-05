import React from 'react'
import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    dispatch(filter(filterValue))
  }
  const style = {
    margin: '1em 0',
  }

  return (
    <div style={style}>
      Filter anecdotes: <input onChange={handleChange} />
    </div>
  )
}

export default Filter
