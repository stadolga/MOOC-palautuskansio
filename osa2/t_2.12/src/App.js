import { useState, useEffect } from 'react'
import axios from 'axios'


const RenderCountry = ({con}) => {
  const languages = Object.values(con.languages)
  
  return(
    <div>
      <h1>{con.name.common}</h1>
      <p>capital : {con.capital}</p>
      <p>area: {con.area}</p>
      <b>languages:</b>
      {
        languages.map((language, index) => (
          <p key={index}>{language}</p>
        ))
      }
      <img src={con.flags.png} />
    </div>
  )
}

const RenderRes = ({results, onCountrySelection}) => {
  if(results.length > 10){
    return(
    <p>too many matches, specify another filter</p>
    )
  }

  if(results.length === 1){
    var country = results[0]
    return <RenderCountry con = {country}/>
  }
  if(results.length <= 10){
    return(
      <>
        {results.map(country => (
          <p key={country}>{country.name.common}
          <button onClick = {() => onCountrySelection(country)}>show</button>
          </p>
        ))}
      </>
    )
  }
}



const App = () => {
  const [search, setSearch] = useState([])
  const [results, setResults] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        const filter = response.data.filter(item =>
          item.name.common.toLowerCase().includes(search.toLowerCase())
        )
        setResults(filter)
      })
  }, [search])


  const handleCountrySelection = (country) => {
    setSelectedCountry(country)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <form>
        find countries: <input
          value={search}
          onChange={handleSearch}
        />
      </form>
      { selectedCountry ? (
        <RenderCountry con={selectedCountry} />
      ) : (
        <RenderRes results={results} onCountrySelection={handleCountrySelection} />
      )}
    </div>
  )
}

export default App
