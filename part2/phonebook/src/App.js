import React, { useState , useEffect} from 'react'

import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import Notification from "./components/Notification"
import personsService from './services/persons'
import './index.css'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    // fetch all data
    personsService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])
  

  const checkHandle404Error = (error, name, id) => {
    if (error.isAxiosError && error.response && error.response.status === 404) {
      setErrorMessage(
        `Information of ${name} has already been removed from the phonebook.`
        )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== id));
      return true;
    }
    return false;
  };

  // adding a new name
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    
    if (existingPerson) {
      const id = existingPerson.id
      if (!window.confirm(`${existingPerson.name} is already in, sure you want the replace the old number?`)) return;
      personsService
        .update(id, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `${nameObject.name}'s number was successfully updated`
            )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

        /*
        .catch(error => {
          if (checkHandle404Error(error, existingPerson.name, id)) {
            setNewName("");
            setNewNumber("");
          } else {
            setErrorMessage(
              `Failed to update ${existingPerson.name}'s number in the phonebook. ${error}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
        }); */

    } else {
      personsService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `${nameObject.name} was successfully added to the phonebook`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }   
  }

  const deleteName = (personToDelete) => {
    //let person = persons.find(p => p.id === id);
    if (!window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) return;
    console.log(personToDelete.id)
    
    personsService
      .deletename(personToDelete.id)
      .then(() => {
        setNotificationMessage(`Removed ${personToDelete.name} successfully`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== personToDelete.id))
      })
      .catch(error => {
        if (!checkHandle404Error(error, personToDelete.name, personToDelete.id)) {
          setErrorMessage(
            `Failed to remove ${personToDelete.name} from the phonebook. ${error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      });
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  let filteredPersons = persons;
  if (filter) {
    filteredPersons = persons.filter(
      p => p.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber}
                  handleNumberChange={handleNumberChange}
                  handleNameChange={handleNameChange}
                  addName={addName} />
      <Notification type='error' message={errorMessage} />
      <Notification type='success' message={notificationMessage} />
      <h2>Numbers</h2>
      <Persons numbers={filteredPersons} deleteName={deleteName}/>
    </div>
  )
}

export default App