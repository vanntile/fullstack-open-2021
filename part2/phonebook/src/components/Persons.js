import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, fetchPeople }) => (
  <ul>
    {persons.map((p) => (
      <li key={p.id}>
        {p.name}: {p.number}{' '}
        <button
          onClick={async () => {
            if (window.confirm(`Do you want to remove entry for ${p.name}`)) {
              await personService.remove(p.id)
              await fetchPeople()
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
