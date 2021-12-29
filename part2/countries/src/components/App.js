import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CountryList from './CountryList'
import SearchForm from './SearchForm'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/all`)
      setCountries(response.data)
    }

    fetchData()
  }, [])

  const updateSearchField = (value) => {
    setSelectedCountry(undefined)
    setSearchField(value)
  }

  return (
    <>
      <SearchForm value={searchField} setValue={updateSearchField} />
      <CountryList
        countries={countries.filter((c) => c.name.common.toLowerCase().includes(searchField))}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
    </>
  )
}

export default App
