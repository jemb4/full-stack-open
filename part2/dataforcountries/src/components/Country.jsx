import Weather from "./Weather"

const Country = ({countryDetails}) => {
    const languagesArray = Object.values(countryDetails.languages) // convertimos el objeto en array
    return(
        <>
            <h2>{countryDetails.name.common}</h2>
            <p>capital {countryDetails.capital}</p>
            <p>area {countryDetails.area}</p>
            <b>languages:</b>
            <ul>
                {languagesArray.map( (language, i) => 
                    <li key={i}>
                        {language}
                    </li>
                )}
            </ul>
            <img 
                src={countryDetails.flags.svg} 
                alt={countryDetails.flags.alt}
                width={200} 
            />
            <Weather countryDetails={countryDetails}/>
        </>
    )
}

export default Country