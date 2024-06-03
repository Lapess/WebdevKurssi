import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

function App() {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [queryCity, setQueryCity] = useState(null)

  useEffect(() => {
    countryService.getAllCountries()
    .then((countryList) => setCountries(countryList))
  }, [])

  useEffect(() => {
    if (queryCity) {
      weatherService.getWeatherInfo(queryCity)
      .then((response) => setWeatherData(response))
    }
  }, [queryCity])

  const updateFilter = (event) => {
    const newValue = event.target.value.toLowerCase()
    setSearchFilter(newValue)

    if (newValue.length === 0) {
      setQueryCity(null)
    } 
    else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(newValue)
      )
      if (filteredCountries.length === 1) {
        setQueryCity(filteredCountries[0].capital[0])
      } 
      else {
        setQueryCity(null)
      }
    }
  }
  const handleShowCountry=(country)=>{
    setSearchFilter(country.name.common.toLowerCase())
    setQueryCity(country.capital[0])
  }

  return (
    <>
      <SearchLine updateFilter={updateFilter} searchFilter={searchFilter} />
      <CountriesToRender
        countries={countries}
        searchFilter={searchFilter}
        queryCity={queryCity}
        weatherData={weatherData}
        handleShowCountry={handleShowCountry}
      />
    </>
  )
}

const CountriesToRender = ({ countries, searchFilter, setQueryCity, weatherData, handleShowCountry}) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchFilter.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )

  }
  else if (filteredCountries.length <= 10 && filteredCountries.length > 1){
    return(
      <>
            {filteredCountries.map((country) => (
        <RenderCountryLine
        country={country}
         key={country.name.common}
         setQueryCity={setQueryCity}
         state={2}
         weatherData={weatherData}
         handleShowCountry={handleShowCountry} />
      ))}
      </>
    )
  }

  return (
    <>
      {filteredCountries.map((country) => (
        <RenderCountryLine country={country} key={country.name.common} setQueryCity={setQueryCity} state={1} weatherData={weatherData} />
      ))}
    </>
  )
}

const RenderCountryLine = ({country, state, weatherData, handleShowCountry}) => {

  if (state ===1){
    return (
      <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Languages:</h2>
        {Object.values(country.languages).map((lang) => (
          <LangLine lang={lang} key={lang} />
        ))}
        <div>
          <img src={country.flags.png} />
        </div>
        <RenderWeatherInfo weatherData={weatherData}/>
      </>
    )
  }
  else if (state ===2){
    return(
      <div>
        {country.name.common} <button onClick={()=>handleShowCountry(country)}>show
        </button>
      </div>
    )
  }

  
}

const LangLine = ({ lang }) => {
  return <li>{lang}</li>
}

const SearchLine = ({ updateFilter, searchFilter }) => {
  return (
    <>
      <input onChange={updateFilter} value={searchFilter} />
    </>
  )
}

const RenderWeatherInfo=({weatherData})=>{
  if (weatherData){
    return(
      <>
      <h2>Weather in {weatherData.location.name}</h2>
      Temperature {weatherData.current.temp_c}°C
      <div>
      <img src= {weatherData.current.condition.icon}/>
      </div>
      wind {windspeedConversion(weatherData.current.wind_kph)} m/s
      </>
    )
  }

}

const windspeedConversion=(windspeed)=>{
  return windspeed/3.6
}

export default App
