import React from 'react'
import { handleChange } from '../lib/utils'

const Filter = ({ value, setValue }) => {
  return (
    <div>
      Search for: <input value={value} onChange={handleChange(setValue)} />
    </div>
  )
}

export default Filter
