import React, { useEffect, useState } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import PersonsForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchField, setSearchField] = useState('')

  const fetchPeople = async () => {
    const response = await personService.getAll()
    setPersons(response.data)
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const addToPhonebook = async ({ name, number }) => {
    const existingEntry = persons.find((e) => e.name === name)

    if (existingEntry) {
      if (window.confirm(`${name} is already in the phonebook, replace the old number with the new one?`)) {
        await personService.update(existingEntry.id, { name, number })
        await fetchPeople()

        return true
      } else {
        return false
      }
    }

    const response = await personService.create({ name, number })
    setPersons([...persons, response.data])

    return true
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchField} setValue={setSearchField} />
      <h2>Add a new number</h2>
      <PersonsForm submit={addToPhonebook} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter((p) => p.name.toLowerCase().includes(searchField))} fetchPeople={fetchPeople} />
    </div>
  )
}

export default App
