import Country from './Country'

const CountryList = ({ countries, selectedCountry, setSelectedCountry }) => (
  <>
    {selectedCountry ? (
      <Country country={selectedCountry} />
    ) : countries.length === 1 ? (
      <Country country={countries[0]} />
    ) : countries.length <= 10 ? (
      countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
        </li>
      ))
    ) : (
      <p>Too many matches, specify another filter</p>
    )}
  </>
)

export default CountryList
