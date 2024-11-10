import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const createPerson = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const updatePerson = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default{getPersons, createPerson, updatePerson, deletePerson}