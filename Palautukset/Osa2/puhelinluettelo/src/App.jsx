import { useState, useEffect } from 'react'
import "./services/contact"
import contactService from './services/contact';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [message, setMessage] = useState([null,null])

  useEffect(()=>{
    contactService.getAllContacts()
    .then(initialNumbers =>{
      setPersons(initialNumbers)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    
    if (!existingPerson) {
      const newPerson = {
        name: newName,
        number: phoneNumber
      }
      contactService.postNewContact(newPerson)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))

        setMessage([`new contact for ${newPerson.name} succesfully added to contactlist`,0])
        setTimeout(()=>{
          setMessage([null,null])
        }, 3000)
      })
    }
    else if(existingPerson.number !== phoneNumber){
        const replaceOldNumber = window.confirm(`Contact for ${newName} is already added to phonebook, do you want to replace the old number with new one?`)
        if (replaceOldNumber){
          const updatedContact = {...existingPerson, number: phoneNumber}

          contactService.updateContact(existingPerson.id, updatedContact)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id === updatedContact.id ? returnedPerson : person))
          })
          .catch(error=>{
            setMessage([`contact that you've tried to modify has already been deleted from the server`,1])
            setTimeout(()=>{
              setMessage([null,null])
            }, 3000)
            setPersons(persons.filter(per => per.id !== updatedContact.id))
          })
          setMessage([`updated number for contact ${updatedContact.name} is succesfully added to contactlist`,0])
          setTimeout(()=>{
            setMessage([null,null])
          }, 3000)
        }
    }
    else{
      window.alert(`${newName} is already added to phonebook`)
    }

    setNewName("")
    setPhoneNumber("")
  }

  const deleteContact=(id, name)=>{
    const confirmation = window.confirm(`Are you sure you want to delete ${name} from contact list?`)
    if (confirmation){
      contactService.deleteContact(id)
      .then(returnedContact => setPersons(persons.filter(contact =>contact.id !== id)))

      setMessage([`contact ${name} is succesfully removed from contactlist`,0])
      setTimeout(()=>{
        setMessage([null,null])
      }, 3000)
    }
  }


  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value)
  }


  return (
    <>
      <h2>Phonebook</h2>
      <Notification message ={message}/>
      < SearchField
      searchinput = {searchInput}
      handleSearchInputChange = {handleSearchInputChange}/>
      
      <h2>Add a new</h2>
      <AddNumberLogic
      addPerson = {addPerson}
      newName = {newName}
      handleNameInputChange = {handleNameInputChange}
      phoneNumber = {phoneNumber}
      handleNumberInputChange = {handleNumberInputChange}/>

      <h2>Numbers</h2>
      <RenderNumbers persons = {persons}
      searchInput={searchInput}
      deleteContact={deleteContact}/>
    </>
  )
}

const RenderContact = ({ person, searchInput,deleteContact }) => {
  if (person.name.toLowerCase().includes(searchInput.toLowerCase())) {
    return (
      <p>
        {person.name} {person.number}
        <button onClick={()=>deleteContact(person.id, person.name)}>Delete contact</button>
      </p>
    )
  }
}

const SearchField=({searchInput, handleSearchInputChange})=>{
  return(
    <>
    <input 
    value={searchInput}
    onChange={handleSearchInputChange}
    />
    </>
  )
}

const AddNumberLogic =(props)=>{
  const {addPerson, newName, handleNameInputChange, handleNumberInputChange, phoneNumber} = props
  return(
    <>
    <form onSubmit={addPerson}>
      name: <input 
      value={newName}
      id="name"
      onChange={handleNameInputChange}/>
      <div>
        number: <input 
        value={phoneNumber}
        id="number"
        onChange={handleNumberInputChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

const RenderNumbers=({persons, searchInput, deleteContact})=>{
return(
  <>
  {persons.map(person =>
  <RenderContact 
  key={person.name} 
  person ={person}
  searchInput={searchInput}
  deleteContact={deleteContact}/>
  )}
  </>
)
}
const Notification=({message})=>{
  const messageStyle =[{
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },{
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }]

  if (message[0] === null){
    return null
  }
  return(
    <div style={messageStyle[message[1]]}>
      {message[0]}
    </div>
  )
}

export default App;
