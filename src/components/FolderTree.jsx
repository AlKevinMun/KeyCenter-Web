import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FolderElement from './FolderElement.jsx';

function FolderTree() {
  const location = useLocation();
  const currentRoute = location.pathname;
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
      let fetchRoutes = true;
      let fetchModifiedRoutes = false;

      if (location.pathname.includes('/Incidencias/DetallesIncidencia')) {
          fetchRoutes = false;
      } else if (location.pathname.includes('/Manuales/ManualUso')) {
          fetchRoutes = false;
          fetchModifiedRoutes = true;
      }

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
  }, [location]);


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
