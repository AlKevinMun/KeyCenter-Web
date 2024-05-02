import React from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import InputText from "../components/InputText.jsx"
import AddButton from "../components/AddButton.jsx"
import { Link } from "react-router-dom";


function SignIn() {
  return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', null,
        React.createElement('p', { className: 'h2ayuda' }, 'Us cal ajuda?'),
      ),
      React.createElement('div', { className: 'bigayuda-container' },
        React.createElement('div', { className: 'ayuda-container' },
          React.createElement('p', { className: 'texto boton' }, 'Usuari '),
          React.createElement('br', null),
          React.createElement('br', null),
          InputText('Introduïu el vostre usuari o correu electrònic i us enviarem un enllaç des d\'on podreu canviar la vostra contrasenya.'),
          React.createElement('hr', { className: 'container-label-line1' }),
          AddButton('Canvia la contrasenya'),
          React.createElement('p', { className: 'texto' }, 'Us cal més ajuda?'),
          React.createElement(Link, { to: "https://mail.google.com/mail/u/1/#inbox?compose=DmwnWtVbFLDGRPdKqddRSzPHnGPxRJWZRlTMbxNGqhRCvbJHnmkPNklxLrPVctxFlxZntrTwSVpL", className: "menu-link link" },
            React.createElement('p', null, 'Contacteu amb un administrador.')
          ),
          React.createElement('br', null),
          React.createElement('p', { className: 'texto' }, 'Aneu a '),
          React.createElement(Link, { to: "/SignIn", className: "menu-link link" },
            React.createElement('p', null, 'inici de sessió')
          ),
        ),
        React.createElement('div', { className: 'ayuda-container' },
          React.createElement('p', { className: 'texto boton' }, 'Correu electrònic '),
          React.createElement('br', null),
          React.createElement('br', null),
          InputText('Introduïu el vostre correu electrònic i us enviarem el vostre nom d\'usuari.'),
          React.createElement('hr', { className: 'container-label-line1' }),
          AddButton('Obté el nom d’usuari'),
        ),
      ),
    )
  );
}

export default SignIn;
