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
    const parentElement = React.createElement(FolderElement, { key: route.path, path: route.path, name: route.name, icon: route.icon });

    let childElement = null;
    if (route.path === '/Manuales' && route.children) {
      const matchingChildRoute = route.children.find(child => currentRoute.startsWith(route.path));
      if (matchingChildRoute) {
        childElement = React.createElement(FolderElement, { key: matchingChildRoute.path, path: matchingChildRoute.path, name: matchingChildRoute.name, icon: matchingChildRoute.icon, className: "folder-element  child-folder-element" });
      }
    }
    return [parentElement, childElement];
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
