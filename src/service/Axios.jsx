import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://192.168.242.12:8080/api',
    baseURL: 'http://localhost:8080/api',
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


export default axiosInstance;
