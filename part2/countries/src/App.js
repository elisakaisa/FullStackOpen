import React, { useState , useEffect} from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Countries from "./components/Countries"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  let filteredCountries = countries;
  if (filter) {
    filteredCountries = countries.filter(
      p => p.name.common.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
    );
  }

  return (
    <div>
      <p>{filteredCountries.length}</p>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={filteredCountries} handleFilterChange={setFilter} />
    </div>
  )

}

export default App
