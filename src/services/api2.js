import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sigadev.aparecida.go.gov.br',
});

export default api;