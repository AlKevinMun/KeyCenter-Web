import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderElement from './FolderElement.jsx';

function FolderTree() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // Verifica si la ruta actual cumple con alguna condición específica
    // Por ejemplo, si la ruta contiene "/Incidencias/DetallesIncidencia"
    if (!location.pathname.includes('/Incidencias/DetallesIncidencia')) {
      fetch('resources/routes.json')
      .then(response => response.json())
      .then(data => setRoutes(data));
    } else{
        fetch('../../resources/routes.json')
         .then(response => response.json())
         .then(data => {
           const newData = data.map(item => ({
            ...item,
             icon: '../../resources/folderIcon.png',
           }));
            setRoutes(newData);
          });
      }
  }, [location]);

 const renderFolderElement = (route) => {
     const parentElement = React.createElement(FolderElement, { key: route.path, path: route.path, name: route.name, icon: route.icon });

     let childElements = null;
     if (route.children && route.children.length > 0) {
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
