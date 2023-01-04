import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    id: getId(),
    votes: 0,
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const newVote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const object = response.data;
  object.votes += 1;
  console.log(object, "!!!!!", "CALLED")

  const updateResponse = await axios.put(`${baseUrl}/${id}`, object);
  return updateResponse.data;
}

export default { getAll , createNew, newVote}