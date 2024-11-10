import axios from "axios"
import { useEffect, useState } from "react"


const Weather = ({countryDetails}) => {
    const [weatherDetails, setWeatherDetails] = useState(null)
    const [error, setError] = useState(false);

    const api_key = import.meta.env.VITE_SOME_KEY
    const cap = countryDetails.capital[0]

    useEffect(()=> {
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=${api_key}&units=metric`)
        .then(res => setWeatherDetails(res.data))
        .catch(err => {
            setWeatherDetails(null)
            setError(true)
            console.error(err)
        })
    }, [])

    if(error) {
        return <p>Error loading weather data. Please try again later.</p>
    }
    if (!weatherDetails){
        return <p>Loading weather data...</p>
    }

    return(
        <>
            <h3>Weather in {countryDetails.capital}</h3>
            <p>temperature {weatherDetails.main.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>wind {weatherDetails.wind.speed} m/s</p>
        </>
        )
}


export default Weather