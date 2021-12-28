import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CountryList from './CountryList'
import SearchForm from './SearchForm'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://restcountries.com/v3.1/all`)
      console.log(response.data)
      setCountries(response.data)
    }

    fetchData()
  }, [])

  return (
    <>
      <SearchForm value={searchField} setValue={setSearchField} />
      <CountryList countries={countries.filter((c) => c.name.common.toLowerCase().includes(searchField))} />
    </>
  )
}

export default App
