import { useState, useEffect } from 'react'

import personService from './services/person'

import Input from './components/Input'
import Person from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isAnError, setisAnError] = useState(false)

  useEffect(() => {
    personService
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
  

  const addPerson = (e) => {
    e.preventDefault()

    if(newName === "" || newNumber === ""){
      alert('There is no number or name to add')
      return
    }

    if (persons.some(person => person.name === newName)){
      const person = persons.find(n => n.name === newName)
      const changedNumber = { ...person, number: newNumber }
      console.log(person)
      console.log(changedNumber)

      if(window.confirm(`${newName} is already added to phonebook`)){
        personService
          .updatePerson(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(newPerson=> newPerson.id !== person.id ? newPerson: returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      } else {
        setNewName('')
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${newName}`)
        setTimeout(() => setNotificationMessage(null), 5000)
      })
      .catch(error => {
        setisAnError(true)
        setNotificationMessage(`${error.response.data.error}`)

        setTimeout(() => {
          setisAnError(false)
          setNotificationMessage(null)
        }, 5000)
      })
    console.log('button', e.target)
  }

  const deletePerson = (id) => {
    const person = persons.find( n => n.id === id )
    if(window.confirm(`Are you sure you want to delete ${person.name} ?`)){
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(persons => persons.id !== id))
          setNotificationMessage(
            `Information of ${person.name} has been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setisAnError(false)
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          setisAnError(true)
          setNotificationMessage(
            `Information of ${person.name} has alreday been removed from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
            setisAnError(false)
          }, 5000)
          
        })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchName = (e) => {
    setSearchName(e.target.value)
  }

  const personToShow = searchName
    ? persons.filter(person => 
      person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isAnError={isAnError} />
      <Input 
        text={"filter shown with"} 
        value={searchName} 
        onChange={handleSearchName} 
      />

      <h3>add a new</h3>
      
      <form onSubmit={addPerson}>

        <Input 
          text={"name:"} 
          value={newName} 
          onChange={handleNameChange} 
        />
        <Input 
          text={"number:"} 
          value={newNumber} 
          onChange={handleNumberChange} 
        />

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <Person personToShow={personToShow} deletePerson={deletePerson} />

    </div>
  )
}

export default App