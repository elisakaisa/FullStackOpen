import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {

    if (name) {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(response => {
                setCountry({
                    found: true,
                    data: response.data[0]})
        }).catch(error => {
            setCountry({
              found: false,
              data: null
            })
          })
    } else {
        setCountry({
            found: false,
            data: null
          })
    }
  }, [name])
    
  //console.log('data', country)

  return country
}
