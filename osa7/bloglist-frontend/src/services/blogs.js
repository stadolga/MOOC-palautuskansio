import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  console.log("ea", request);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (newObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(newObject, id);
  await axios.put(`${baseUrl}/${id}`, newObject, config);
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, setToken, create, put, deleteBlog };
