import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderElement from './FolderElement.jsx';
/*
* El siguiente componente se trata del componente del árbol de carpetas que se muestra al lado izquierdo de la web en
* casi todo momento.
*/
function FolderTree() {
  const location = useLocation(); // useLocation es para tener todas las funciones del location
  const currentRoute = location.pathname; // En esta variable se almacena la ubicación actual en la pagina.
  const [routes, setRoutes] = useState([]); // Se almacena un array de string donde están las rutas a la que dirigen.

  // El useEffect se inicia automáticamente la primera vez que se entra en la pagina.
  useEffect(() => {
      let fetchRoutes = true; // Variable para saber si utilizar unas rutas, u otras.
      let fetchModifiedRoutes = false;

      if (location.pathname.includes('/Incidencias/DetallesIncidencia')) {
          fetchRoutes = false;
      } else if (location.pathname.includes('/Manuales/ManualUso')) {
          fetchRoutes = false;
          fetchModifiedRoutes = true;
      }

      // En estas iteraciones lo que se hace es ir al fichero Json donde se encuentran las rutas para ponerle los valores.
      if (fetchRoutes) {
          fetch('resources/routes.json')
              .then(response => response.json())
              .then(data => setRoutes(data))
              .catch(error => console.error('Error fetching routes:', error));
      } else if (fetchModifiedRoutes) {
          fetch('../../resources/routes.json')
              .then(response => response.json())
              .then(data => {
                  const newData = data.map((item: any) => ({
                      ...item,
                      icon: '../../resources/folderIcon.png',
                  }));
                  setRoutes(newData);
              })
              .catch(error => console.error('Error fetching modified routes:', error));
      }
  }, [location]); // No se actualiza el useEffect hasta que se obtiene el valor de location.

  /*
  * Esta constante sirve de función y lo que hace es recorrer todo el fichero de routes.json y crear un FolderElement por
  * cada hijo que haya en el Json.
  */
  const renderFolderElement = (route) => {
    const parentElement = React.createElement(FolderElement, { key: route.path, path: route.path, name: route.name, icon: route.icon });

     let childElements = null;
     if (currentRoute.startsWith('/Manuales') && route.path === '/Manuales' && route.children && route.children.length > 0) {
       childElements = route.children.map(child => {
         return React.createElement(FolderElement, { key: child.path, path: child.path, name: child.name, icon: child.icon, className: "folder-element child-folder-element" });
       });
     }
     return [parentElement, ...(childElements || [])];
   };

  return React.createElement('nav', { className: "nav-container" },
    React.createElement('div', { className: "folder-container" },
      React.createElement('ul', { className: "folder-table" },
        routes.flatMap(route => renderFolderElement(route))
      )
    )
  );
}

export default FolderTree;
