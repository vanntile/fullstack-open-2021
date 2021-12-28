import React, { useState } from 'react'
import { handleChange } from '../lib/utils'

const PersonForm = ({ submit }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()

    if (name === '') {
      alert('A name is needed')
    }

    if (submit({ name, number })) {
      setName('')
      setNumber('')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={name} onChange={handleChange(setName)} />
      </div>
      <div>
        number: <input value={number} onChange={handleChange(setNumber)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
