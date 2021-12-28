import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonsForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/persons')
      setPersons(response.data)
    }

    fetchData()
  }, [])

  const addToPhonebook = ({ name, number }) => {
    const existingName = persons.find((e) => e.name === name)

    if (existingName) {
      alert(`${name} is already added to phonebook`)

      return false
    }

    setPersons([...persons, { name, number, id: persons.length + 1 }])

    return true
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchField} setValue={setSearchField} />
      <h2>Add a new number</h2>
      <PersonsForm submit={addToPhonebook} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter((p) => p.name.toLowerCase().includes(searchField))} />
    </div>
  )
}

export default App
