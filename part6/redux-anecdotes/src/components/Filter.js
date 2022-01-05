import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    props.filter(filterValue)
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

const ConnectedFilter = connect((s) => ({}), { filter })(Filter)
export default ConnectedFilter
