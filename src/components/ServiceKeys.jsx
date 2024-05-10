import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import KeyElement from './KeyElement.jsx'

function ServiceKeys() {
  const location = useLocation();
   let keySource = '../../resources/KeyIcon.png'

    useEffect(() => {
      // Verifica si la ruta actual cumple con alguna condición específica
      // Por ejemplo, si la ruta contiene "/Incidencias/DetallesIncidencia"
      if (!location.pathname.includes('/Incidencias/DetallesIncidencia')) {
        keySource = './resources/KeyIcon.png'
      }
    }, [location]);

    return (
        React.createElement('div', { className: 'service-key-container' },
            React.createElement('ul', { className: 'keys-table' },
                React.createElement('li', { className: 'keys-title' }, 'Llaves en servicio'),
                KeyElement('Llave 1', keySource),
                KeyElement('Llave 2', keySource),
                KeyElement('Llave 3', keySource),
            ),
        ));
}

export default ServiceKeys;