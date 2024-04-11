import React, {useState,useEffect} from "react";
import { useLocation } from "react-router-dom";



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
         React.createElement('p', { className: 'route-element'}, formattedPath),

        )
    );
}

export default NavRoute;
