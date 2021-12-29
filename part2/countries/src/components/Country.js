import axios from 'axios'
import React, { useEffect, useState } from 'react'
import env from 'react-dotenv'

const Country = ({ country }) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${env.WEATHER_API_KEY}`,
      )
      setWeather(response.data)
    }

    fetchData()
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(country.languages).map((l) => (
          <li key={l}>{country.languages[l]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} width="300" />

      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>weather: {weather.weather[0].main}</p>
          <p>temperature: {Math.floor((weather.main.temp - 273.15) * 100) / 100} degrees Celsius</p>
          <p>wind: {weather.wind.speed} kmph</p>
        </>
      )}
    </>
  )
}

export default Country
