import React from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import InputText from "../components/InputText.jsx"
import AddButton from "../components/AddButton.jsx"
import { Link } from "react-router-dom";


function SignUp() {
   return (
      React.createElement('div', { className: 'main-container' },
         Logo('resources/logotipoWeb.png'),
         NavMenu(),
         NavRoute(),
         React.createElement('div', { className: 'sign-container' },
            React.createElement('div', { className: 'data-container' },
               TitleForm('Sign up'),
               React.createElement('form', { className: 'form-container' },
                  React.createElement('div', { className: 'signform-container' },
                     InputText('Correo electronico'),
                     InputText('Contraseña'),
                     AddButton('Crear', 'button-group', null)
                  ),
               ),
               React.createElement('form', { className: 'form-container1' },
                  React.createElement('div', { className: 'signform-container' },
                     React.createElement('p', { className: 'texto' }, 'Ya tienes cuenta? '),
                     React.createElement(Link, { to: "/SignIn", className: "menu-link link" },
                        React.createElement('p', null, 'Iniciar sesión.')
                     ),
                  ),
               ),
            ),
         )
      )
   );
}

export default SignUp;
