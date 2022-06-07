import React, { useState , useEffect} from 'react'
import axios from 'axios'

import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"



const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons + 1,
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }   
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
      <h2>Numbers</h2>
      <Persons numbers={filteredPersons} />
    </div>
  )
}

export default App