import axios from 'axios';
const API = axios.create({
  baseURL: 'https://fanstar-backend.herokuapp.com',
});
export default API;
