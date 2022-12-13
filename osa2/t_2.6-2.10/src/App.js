import { useState } from 'react'

const Filter = ({search,handleSearch}) => {
  return(
    <div>
      <form>
      filter shown with: <input
      value = {search}
      onChange = {handleSearch}>
    </input>
    </form>
  </div>

  )
}


const AddPerson = (props) => {
  return(
    <div>
      <form onSubmit = {props.addPhone} >
      <div>
        name: <input 
        value = {props.newName}
        onChange = {props.handleNameChange}/>
      </div>
      <div>
        number: <input
        value = {props.newNumber}
        onChange = {props.handeNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
  )
}

const DisplayPersons = ({personsToShow}) => {
  return(
    personsToShow.map(person => (<p key={Math.random()}>{person.name} {person.number}</p>))
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handeNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPhone = (event) => {
    const names = persons.map(({ name }) =>  name);
    
    event.preventDefault()
    if(names.includes(newName)){
      alert(`${newName} is already added to phonebook`)
      return;
    }
  
    const person = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(person))
  }

  const personsToShow = search.length === 0
  ? persons
  : persons.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search = {search} handleSearch = {handleSearch}/>
      <AddPerson newName = {newName} handeNumberChange = {handeNumberChange} handleNameChange = {handleNameChange} addPhone = {addPhone}/>

      <h2>Numbers</h2>
      <div>
        <DisplayPersons personsToShow = {personsToShow}/>
      </div>
    </div>
  )

}

export default App