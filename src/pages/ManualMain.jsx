import React from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import ServiceKey from "../components/ServiceKeys.jsx"
import ManualIcon from "../components/ManualIcon.jsx"
import { Link } from "react-router-dom";

function MainPage() {
  return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', { className: 'content-containet' },
        React.createElement('div', { className: 'folders-container' },
          FolderTree(),
        ),
        React.createElement('div', { className: 'data-container' },
          TitleForm('Manuales'),
          React.createElement(Link, { to: "/Manuales/ManualUso", className: "menu-link" },
            React.createElement('div', { className: 'eleccion-container' },
              ManualIcon('resources/manualicon.png', 'US', 'text-manual'),
              React.createElement('p', { className: 'manual-text' }, 'Manual de uso')
            )
          ),
          React.createElement(Link, { to: "/Manuales/ManualInstalació", className: "menu-link"  },
            React.createElement('div', { className: 'eleccion-container' },
              ManualIcon('resources/manualicon.png', 'IN', 'text-manual'),
              React.createElement('p', { className: 'manual-text' }, 'Manual d\'Instal·lació')
            )
          ),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      )
    )
  );
}

export default MainPage;
