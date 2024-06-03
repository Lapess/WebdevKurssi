import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAllContacts=()=>{
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const postNewContact= newcontact =>{
    const request = axios.post(baseUrl, newcontact)
    return request.then(response => response.data)
}

const deleteContact = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response =>response.data)
}

const updateContact = (id, newContactData)=>{
    const request = axios.put(`${baseUrl}/${id}`, newContactData)
    return request.then(response => response.data)
  }

export default {getAllContacts, postNewContact, deleteContact, updateContact}