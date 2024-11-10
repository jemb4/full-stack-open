import { useState ,useEffect } from "react"

import countriesService from "./services/countriesService"

import Input from "./components/Input"
import Countries from "./components/Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')

  useEffect(() =>{
    console.log(import.meta.env.VITE_SOME_KEY)
    countriesService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleFilter = (e) => {
    setSearchCountries(e.target.value)
  }

  const countriesToShow = searchCountries
    ? countries.filter( country => 
      country.name.common.toLowerCase().includes(searchCountries.toLowerCase()))
    : countries

  return (
    <>
      <Input 
        text={'find countries'} 
        value={searchCountries} 
        onChange={handleFilter} 
      />
      <Countries countries={countriesToShow} />
    </>
  )
}

export default App
