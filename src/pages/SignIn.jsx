import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import InputText from "../components/InputText.jsx";
import AddButton from "../components/AddButton.jsx";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { auth } from "../service/Axios.jsx";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const LoginRef = useRef({
        "email": '',
        "password": ''
    });
    const navigate = useNavigate(); // Usa useNavigate

    const handleUsernameChange = (e) => {
        setEmail(e.target.value);
        LoginRef.current.email = e.target.value;
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        LoginRef.current.password = e.target.value;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('test');
        try {
            const response = await auth(JSON.stringify(LoginRef.current));
            console.log(response.data);
            // Redirige al usuario al inicio después de iniciar sesión exitosamente
            navigate('/inicio'); // Asume que '/inicio' es la ruta del inicio
        } catch (error) {
            console.error(error);
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
                    React.createElement('form', { className: 'form-container', onSubmit: handleSubmit },
                        React.createElement('div', { className: 'signform-container' },
                            InputText('Nombre de usuario / Correo electronico', handleUsernameChange, {value: email }),
                            InputText('Contraseña', handlePasswordChange, {type: 'password', value: password}),
                            AddButton('Identificar', 'button-group', handleSubmit)
                        ),
                    ),
                ),
                React.createElement('form', {className: 'form-container1'},
                    React.createElement('div', {className: 'signform-container'},
                        React.createElement('p', {className: 'texto'},'No recuerdas como entrar?'),
                        React.createElement(Link, { to: "/Ayuda", className: "menu-link link"  },
                            React.createElement('p', null, 'Obten ayuda.')
                        ),
                    ),
                ),
            ),
        )
    )
}

export default SignIn;

// NECESIDAD DE QUE VUELVA ATRAS, Y QUE GUARDE EL ROL DEL USUARIO CON EL QUE SE A LOGEADO.