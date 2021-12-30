import React, { useEffect, useState } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import Notification from './Notification'
import PersonsForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchField, setSearchField] = useState('')
  const [notification, setNotification] = useState(null)

  const fetchPeople = async () => {
    const response = await personService.getAll()
    setPersons(response.data)
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const notify = (data, timeout = 3500) => {
    setNotification(data)
    setTimeout(() => {
      setNotification(null)
    }, timeout)
  }

  const addToPhonebook = async ({ name, number }) => {
    const existingEntry = persons.find((e) => e.name === name)

    if (existingEntry) {
      if (window.confirm(`${name} is already in the phonebook, replace the old number with the new one?`)) {
        try {
          await personService.update(existingEntry.id, { name, number })
          await fetchPeople()
          notify({ type: 'success', message: `Success: ${name} has been updated.` })

          return true
        } catch (e) {
          console.error(e)

          notify({ type: 'error', message: `Error: ${name} has already been removed from the server` })
        }
      } else {
        return false
      }
    }

    const response = await personService.create({ name, number })
    setPersons([...persons, response.data])
    notify({ type: 'success', message: `Success: ${name} has been added to the phonebook.` })

    return true
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {notification && <Notification type={notification.type} message={notification.message} />}
      <Filter value={searchField} setValue={setSearchField} />
      <h2>Add a new number</h2>
      <PersonsForm submit={addToPhonebook} />
      <h2>Numbers</h2>
      <Persons
        persons={persons.filter((p) => p.name.toLowerCase().includes(searchField))}
        fetchPeople={fetchPeople}
        notify={notify}
      />
    </div>
  )
}

export default App
