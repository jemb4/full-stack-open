import axios from "axios"
import { useState, useEffect } from "react"
import Country from "./Country"
import Button from "./Button"

const Countries = ({countries}) => {
    const [countryDetails, setCountryDetails] = useState(null)
    const [activeCountry, setActiveCountry] = useState(false)

    useEffect(() => {
        if (countries.length === 1){
            setActiveCountry(false)
            const countryName = countries[0].name.common
            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
                .then(res => setCountryDetails(res.data))
                .catch(err => console.error('Error:', err) )
        } else {
            setCountryDetails(null)
            setActiveCountry(false)
        }
    }, [countries])

    const handleShowCountry = (country) => {
        setCountryDetails(country)
        setActiveCountry(true)
    }

    if((countries.length === 1 && countryDetails) || activeCountry){
        return countryDetails 
        ? ( <Country countryDetails={countryDetails}/> )
        : null
    } else if (countries.length < 10) {
        return (
            <ul>
                {countries.map( country => 
                <li key={country.name.official}>
                    {country.name.common}
                    <Button 
                        handleClick={() => handleShowCountry(country)} 
                        message={"show"} 
                    />
                </li>
                )}
            </ul>
    )}
    return(
        <>
            <p>Too many matches, specify another filter</p>
        </>
    )
}

export default Countries