import axios from 'axios';
const API = axios.create({
  baseURL: 'https://fanstar-backend-uiwtg.ondigitalocean.app/',
});
export default API;
