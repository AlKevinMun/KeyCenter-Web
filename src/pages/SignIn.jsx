import React, { useState, useRef } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import TitleForm from "../components/TitleForm.jsx";
import InputText from "../components/InputText.jsx";
import AddButton from "../components/AddButton.jsx";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import { auth, getUserByEmail } from "../service/Axios.jsx";

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
        try {
            console.log("Datos enviados:", LoginRef.current); // Depuración: Verifica los datos enviados
            const response = await auth(LoginRef.current);
            console.log(response.data);

            // Guarda el token y el correo electrónico en sessionStorage
            sessionStorage.setItem('token', response.data);
            const response1 = await getUserByEmail(email);
            console.log(response1.data);
            sessionStorage.setItem('loginUser', JSON.stringify(response1.data));

            navigate('/'); // Asume que '/inicio' es la ruta del inicio
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
                            InputText('Correo electronico', handleUsernameChange, {value: email }),
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