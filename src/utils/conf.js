import axios from 'axios';

const api = axios.create({
    baseURL: 'https://realty-backend.soloshoes.online',
    withCredentials: true,
  });

export default api;