import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KeyElement from './KeyElement.jsx';
import { getKey } from '../service/Axios.jsx';

function ServiceKeys() {
  const location = useLocation();
  let keySource = '../../resources/KeyIcon.png';

  const [keys, setKeys] = useState([]);

  useEffect(() => {
    if (!location.pathname.includes('/Incidencias/DetallesIncidencia')) {
      keySource = './resources/KeyIcon.png';
    }
    // Llama a getKey para obtener las llaves
    getKey().then(response => {
      const filteredKeys = response.data.filter(key => key.user_id > 1);
      setKeys(filteredKeys); // Actualiza el estado con las llaves filtradas
      console.log(response.data);
    });
  }, [location]);

  return (
    React.createElement('div', { className: 'service-key-container' },
      React.createElement('ul', { className: 'keys-table' },
        React.createElement('li', { className: 'keys-title' }, 'Llaves en servicio'),
       ...keys.map(key =>
          React.createElement(KeyElement, { name: key.room_name, icon: keySource })
        ), // Corrected here
      ),
    ));
}

export default ServiceKeys;
