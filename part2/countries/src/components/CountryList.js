import Country from './Country'

const CountryList = ({ countries }) => (
  <>
    {countries.length === 1 ? (
      <Country country={countries[0]} />
    ) : countries.length <= 10 ? (
      countries.map((country) => <li key={country.fifa}>{country.name.common}</li>)
    ) : (
      <p>Too many matches, specify another filter</p>
    )}
  </>
)

export default CountryList
