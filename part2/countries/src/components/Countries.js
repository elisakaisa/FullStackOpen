import React from 'react'

const Languages = ({languages}) => {
return (
    <div>
    <ul>
        {Object.keys(languages).map(key => 
            <li key={key}>{languages[key]}</li>)}
    </ul>
    </div>
)
}



const Countries = ({countries, handleFilterChange}) => {

    if (countries.length > 10) {
        return (
            <div><p>Too many matches, specify filter</p></div>
        )
    } 

    if (countries.length < 2) {
        return (
            <div>
                {countries.map((country) =>
                    <div key={country.name.common}>
                        <h2>{country.name.common}</h2> 
                        <p>Capital: {country.capital}</p>
                        <p>Area: {country.area} km²</p>
                        <h3>Languages:</h3>
                        <Languages languages={country.languages} />
                        <img src={country.flags.png} alt='country flag'/>
                    </div>)
                }
            </div>
        )
    }

    return (
        <div>
        {countries.map((country) =>
            <div key={country.name.common}>
                {country.name.common} 
                <button onClick={() => handleFilterChange(country.name.common)}>show</button>
            </div>)}
        </div>
    )
}

export default Countries