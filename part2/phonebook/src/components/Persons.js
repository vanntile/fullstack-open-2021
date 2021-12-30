import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, fetchPeople, notify }) => (
  <ul>
    {persons.map((p) => (
      <li key={p.id}>
        {p.name}: {p.number}{' '}
        <button
          onClick={async () => {
            if (window.confirm(`Do you want to remove entry for ${p.name}`)) {
              try {
                await personService.remove(p.id)
                await fetchPeople()
              } catch (e) {
                console.error(e)

                notify({ type: 'error', message: `Error: ${p.name} has already been removed from the server` })
              }
            }
          }}
        >
          delete
        </button>
      </li>
    ))}
  </ul>
)

export default Persons
