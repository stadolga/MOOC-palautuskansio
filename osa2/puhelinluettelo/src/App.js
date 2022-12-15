import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { AddPerson, Filter, DisplayPersons } from './components'
import noteService from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    noteService
    .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const deletePerson = (person) => {
    const id = person.id
    console.log(person)
    noteService
        .deleteUsr(person)
        .then(returnedNote => {
          const newPersons = persons.filter(note => note.id !== id)
          setPersons(newPersons)
        })
        .catch(error => {
          alert(
            `the content was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        })
  }

  const updateNumber = (name, newObject) =>{
    const id = persons.find(person => person.name === name).id
    noteService
    .update(id, newObject)
    .then(returnedNote => {
      setPersons(persons.map(person => person.id !== id ? person : returnedNote))
    })
    .catch(error => {
      alert(
        `the person was already deleted from server`
      )
      setPersons(persons.filter(n => n.id !== id))
    })
}
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

    const person = {
      name: newName,
      number: newNumber
    }
    
    event.preventDefault()
    if(names.includes(newName)){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)){
        updateNumber(newName,person)
      }
      setNewName('')
      event.target.reset()
      return;
    }
  
    noteService
    .create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      event.target.reset()
    })

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
        <DisplayPersons personsToShow = {personsToShow} deleter = {deletePerson}/>
      </div>
    </div>
  )

}

export default App