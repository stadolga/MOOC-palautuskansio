import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl).then( r=> r.data);
    return request;
  }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log(newObject)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteUsr = (person) => {
    if(window.confirm(`Delete ${person.name}?`)){
      const req = axios.delete(`${baseUrl}/${person.id}`)
      return req.then(response => response.data)
    }
  }
  

export default { getAll, create, update, deleteUsr }