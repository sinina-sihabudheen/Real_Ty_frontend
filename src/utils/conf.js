import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://realty-properties.duckdns.org',
    baseURL: 'http://localhost:8000/',

    
    withCredentials: true,
  });

export default api;