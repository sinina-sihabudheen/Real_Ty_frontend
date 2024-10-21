import axios from 'axios';

const api = axios.create({
    baseURL: 'https://realty-properties.duckdns.org',
    
    withCredentials: true,
  });

export default api;