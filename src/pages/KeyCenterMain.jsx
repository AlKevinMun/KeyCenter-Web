import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import ServiceKey from "../components/ServiceKeys.jsx"
console.log(sessionStorage);

/* Forma de obtener el rol del usuario que se encuentra actualmente logeado.
const loginUserObject = JSON.parse(sessionStorage.loginUser);
const rol = loginUserObject.rol;
*/
function MainPage() {
  return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png', 'img-container'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', { className: 'content-containet' },
        React.createElement('div', { className: 'folders-container' },
          FolderTree(),
        ),
        React.createElement('div', { className: 'data-container' },
          TitleForm('KeyCenter'),
          React.createElement('div', { className: 'info-container' },
            React.createElement('p', { className: 'slogan' }, 'Inserta el lema aquí')),
          Logo('resources/logo.png', 'logoImg'),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      )
    )
  );
}

export default MainPage;
