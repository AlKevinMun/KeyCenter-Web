import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
/*
* El siguiente componente se trata de una ventana emergente que saldría solamente si alguna operación diera un error.
* A la hora de crear el componente se debe insertar una string con el mensaje que se mostrara en esta ventana emergente,
* un booleano para saber si esta ventana se mostrara o no, y una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
*/
function NavRoute(route) {
  const location = useLocation();
  const [formattedPath, setFormattedPath] = useState('');

  useEffect(() => {
    // Verifica si la ruta es solo '/' o está vacía
    if (location.pathname === '/' || location.pathname === '') {
      setFormattedPath('Inicio');
    } else {
      // Reemplaza la primera '/' con 'Inicio' y las '/' siguientes con ' > '
      const pathSegments = location.pathname.split('/').filter(segment => segment);
      const formatted = ['Inicio', ...pathSegments].join(' > ');
      setFormattedPath(formatted);
    }
  }, [location.pathname]); // Dependencia en location.pathname para actualizar cuando cambie la ruta

  return (
    React.createElement('div', { className: 'route-container' },
      React.createElement('p', { className: 'route-element' }, formattedPath),

    )
  );
}

export default NavRoute;
