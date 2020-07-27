import axios from 'axios';

const api = axios.create({
   // baseURL: 'http://172.16.1.196:3333',
  //  baseURL: 'http://172.16.1.196:3333',
  baseURL: 'https://sigadev.aparecida.go.gov.br'
});

export default api;