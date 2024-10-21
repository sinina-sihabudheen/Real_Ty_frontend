import axios from 'axios';

const api = axios.create({
    baseURL: 'http://43.204.108.44:5003',
    
    withCredentials: true,
  });

export default api;