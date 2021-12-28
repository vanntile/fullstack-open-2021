const Country = ({ country }) => (
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
  </>
)

export default Country
