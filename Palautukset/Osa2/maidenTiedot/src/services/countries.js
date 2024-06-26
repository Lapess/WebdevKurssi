import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"


const getAllCountries=()=>{

    const request = axios.get(`${baseUrl}/all`)
    return request.then(reponse=> reponse.data)
}

export default {getAllCountries}