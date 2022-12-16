import { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { AddPerson, Filter, DisplayPersons } from './components'
import noteService from './services'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if(message.includes('has already been removed from the server')){
    return(
      <div className="deleteError">
      {message}
    </div>
    )
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    noteService
    .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const deletePerson = (person) => {
    const id = person.id
    noteService
        .deleteUsr(person)
        .then(returnedNote => {
          const newPersons = persons.filter(note => note.id !== id)
          setPersons(newPersons)
          setMessage(
            `deleted ${person.name}'s contact information`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage("Deleting the user failed")
        })
  }

  const updateNumber = (name, newObject) =>{
    const id = persons.find(person => person.name === name).id

    noteService
    .update(id, newObject)
    .then(returnedNote => {
      setPersons(persons.map(person => person.id !== id ? person : returnedNote))
      setMessage(
        `updated ${name}'s phone number`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
    .catch(error => {
      setMessage(
        `Information of ${newName} has already been removed from the server`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
      setMessage(
        `added ${newName} to the phonebook`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })

  }

  const personsToShow = search.length === 0
  ? persons
  : persons.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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