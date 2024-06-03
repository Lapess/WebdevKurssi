import axios from "axios";

const baseurl = "http://api.weatherapi.com/v1"
//const apiKey = import.meta.env.weatherApiKey
const apiKey = "78306025bfe244b492093215240206"


const getWeatherInfo=(city)=>{

    const request = axios.get(`${baseurl}/current.json?key=${apiKey}&q=${city}&aqi=no`)
    return request.then(response => response.data)
}

export default {getWeatherInfo}