import React, { useEffect } from 'react';

const PruebaApi = ({ onDataFetched }) => {
 const user = 'kevin.munozgil@plexus.es';
 const pass = 'test1';
 
 useEffect(() => {
  const fetchData = async () => {
    try {
      // Verifica si los datos ya están almacenados en sessionStorage
      const storedData = window.sessionStorage.getItem("apiData");
      if (storedData) {
        // Si los datos están almacenados, los utiliza y llama al callback
        onDataFetched(JSON.parse(storedData));
      } else {
        // Si los datos no están almacenados, realiza la llamada a la API
        const response = await fetch('http://localhost:8080/o/fcsai/perfilprofesional/listas', {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(user + ":" + pass)
          }
        });
        const data = await response.json();
        console.log(data);
        // Almacena los datos en sessionStorage
        window.sessionStorage.setItem("apiData", JSON.stringify(data));
        // Llama al callback con los datos obtenidos
        onDataFetched(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []); // Use an empty dependency array to run the effect only once

// Return null if not rendering anything
return null;
};

export default PruebaApi;
