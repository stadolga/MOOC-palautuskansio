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

const DisplayPersons = ({personsToShow,deleter}) => {
    return(
      personsToShow.map(person => (
        <p key={Math.random()}>
          {person.name} {person.number}
          <button onClick ={() => {deleter(person)}}>delete</button>
        </p>
      ))
    )
  }




export{DisplayPersons,AddPerson,Filter}