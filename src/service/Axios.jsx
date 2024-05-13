import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://192.168.242.12:8080/api',
    baseURL: 'http://192.168.250.84:8080/api',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
});

// Función para obtener usuarios
export const getUser = () => {
    return axiosInstance.get('/users');
};

// Función para obtener una incidencia
export const getIncidence = () => {
    return axiosInstance.get(`/incidences`);
};
// Función para obtener una incidencia via id
export const getIncidenceById = (id) => {
    return axiosInstance.get(`/incidences/${id}`);;
};
// Función para actualizar una incidencia
export const postIncidence = (data) => {
    return axiosInstance.post('/incidences', data);
};
// Función para borrar una incidencia
export const deleteIncidence = (id) => {
    return axiosInstance.delete(`/incidences/${id}`);;
};

// Función para obtener una llave
export const getKey = () => {
    return axiosInstance.get(`/llaves`);
};
// Función para obtener una llave via id
export const getKeyById = (id) => {
    return axiosInstance.get(`/llaves/${id}`);;
};
// Función para actualizar una llave
export const postKey = (data) => {
    return axiosInstance.post('/llaves', data);
};
// Función para borrar una llave
export const deleteKey = (id) => {
    return axiosInstance.delete(`/llaves/${id}`);;
};


export default axiosInstance;
