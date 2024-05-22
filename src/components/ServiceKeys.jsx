import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KeyElement from './KeyElement.jsx';
import { getKey } from '../service/Axios.jsx';
/*
* El siguiente componente se trata del apartado de la derecha donde se muestran las llaves activas.
*/
function ServiceKeys() {
  const location = useLocation(); // Se hace uso de los metodos obtenidos por el useLocation y se almacenan en una variable.
  let keySource = '../../resources/KeyIcon.png'; // Variable para el caso de que se acceda desde otro lugar a la pagina

  const [keys, setKeys] = useState([]); // Estado para guardar las llaves.

  // El useEffect se inicia automáticamente la primera vez que se entra en la pagina.
  useEffect(() => {
    // El siguiente if comprueba si esta o no en una ruta especifica para cambiar de donde se obtiene el icono de la llave.
    if (!location.pathname.includes('/Incidencias/DetallesIncidencia')) {
      keySource = './resources/KeyIcon.png';
    }
    // Llama a getKey para obtener las llaves
    getKey().then(response => {
      const filteredKeys = response.data.filter(key => key.user_id > 1);
      setKeys(filteredKeys); // Actualiza el estado con las llaves filtradas
      console.log(response.data);
    });
  }, [location]); // No se actualiza el useEffect hasta que se obtiene el valor de location.

  return (
    React.createElement('div', { className: 'service-key-container' },
      React.createElement('ul', { className: 'keys-table' },
        React.createElement('li', { className: 'keys-title' }, 'Llaves en servicio'),
       ...keys.map(key =>
          React.createElement(KeyElement, { name: key.room_name, icon: keySource })
        ),
      ),
    ));
}

export default ServiceKeys;
