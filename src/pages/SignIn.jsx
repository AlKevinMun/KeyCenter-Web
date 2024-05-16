import React,{ useState, useEffect } from "react";
import axios from 'axios';
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import InputText from "../components/InputText.jsx"
import AddButton from "../components/AddButton.jsx"
import { Link } from "react-router-dom";
import {auth} from"../service/Axios.jsx";

function SignIn() {
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        try {
            const response = await auth({ Email, password }); // Asume que '/login' es el endpoint correcto
            console.log(response.data); // Maneja la respuesta de la API aquí
            // Aquí puedes redirigir al usuario a otra página después de iniciar sesión exitosamente
        } catch (error) {
            console.error(error);
            // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
        }
    };

    return (
        React.createElement('div', { className: 'main-container' },
            Logo('resources/logotipoWeb.png'),
            NavMenu(),
            NavRoute(),
            React.createElement('div', { className: 'sign-container' },
                React.createElement('div', { className: 'data-container' },
                    TitleForm('Sign in'),
                    React.createElement('form', { className: 'form-container', onSubmit: null },
                        React.createElement('div', { className: 'signform-container' },
                            InputText('Nombre de usuario / Correo electronico', null),
                            InputText('Contraseña', null),
                            AddButton('Identificar', 'button-group', null)
                        ),
                    ),
            React.createElement('form', {className: 'form-container1'},
                React.createElement('div', {className: 'signform-container'},
                    React.createElement('p', {className: 'texto'},'No recuerdas como entrar?'),
                    React.createElement(Link, { to: "/Ayuda", className: "menu-link link"  },
                    React.createElement('p', null, 'Obten ayuda .')
                ),
                ),
            ),
         ),
       )
    )
 );
}

export default SignIn;
