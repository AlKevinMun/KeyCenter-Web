import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import ServiceKey from "../components/ServiceKeys.jsx"

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
          React.createElement('p', null, 'Prueba para ver como se ve este apartado to guapo'),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      )
    )
  );
}

export default MainPage;
