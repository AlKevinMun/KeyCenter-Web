import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderElement from './FolderElement.jsx';

function FolderTree() {
 const location = useLocation();
 const currentRoute = location.pathname;
 const [routes, setRoutes] = useState([]);

 useEffect(() => {
    fetch('resources/routes.json')
      .then(response => response.json())
      .then(data => setRoutes(data));
 }, []);

 const renderFolderElement = (route) => {
    // Verificar si la ruta actual coincide con la ruta de una subpágina dentro de "Manuales"
    if (route.path === '/Manuales' || '/Manuales' && route.children) {
        console.log('Hola')
      const matchingChildRoute = route.children.find(child => currentRoute.startsWith(child.path));
      if (matchingChildRoute) {
          console.log('Chino')
        return React.createElement(FolderElement, { key: matchingChildRoute.path, path: matchingChildRoute.path, name: matchingChildRoute.name, icon: matchingChildRoute.icon });
      }
    }
    // Para rutas no anidadas o que no coinciden con la condición anterior, se sigue la lógica existente
    return React.createElement(FolderElement, { key: route.path, path: route.path, name: route.name, icon: route.icon });
 };

 return React.createElement('nav', { className: "nav-container" },
    React.createElement('div', { className: "folder-container" },
      React.createElement('ul', { className: "folder-table" },
        routes.map(route => renderFolderElement(route))
      )
    )
 );
}

export default FolderTree;
