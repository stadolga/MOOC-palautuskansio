import { useState, useEffect } from 'react'
import axios from 'axios'

const RenderRes = ({results}) => {
  if(results.length > 10){
    return(
    <p>too many matches, specify another filter</p>
    )
  }

  if(results.length === 1){
    var con = results[0]
  
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
  if(results.length <= 10){
  return(
      <>
        {results.map(country => (
          <p key={Math.random()}>{country.name.common}</p>
        ))}
      </>
    )}
  }




const App = () => {
  const [search, setSearch] = useState([])
  const [results, setResults] = useState([])

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


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <form>
        find countries: <input
          value={search}
          onChange={handleSearch}
        />
      </form>
    <RenderRes results = {results}/>
    </div>
  )
}

export default App
