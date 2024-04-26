import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: 'http://192.168.242.12:8080/api',
 timeout: 1000,
 headers: {
    'Content-Type': 'application/json',
 },
});

// Función para obtener usuarios
export const getUser = () => {
 return axiosInstance.get('/users', {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
 });
};

// Función para obtener una incidencia
export const getIncidence = (incidenceId) => {
 return axiosInstance.get(`/incidences/${incidenceId}`);
};

// Función para actualizar una incidencia
export const putIncidence = (data) => {
 return axiosInstance.put('/incidences', data);
};


export default axiosInstance;
