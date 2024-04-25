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

const baseURL = "http://192.168.242.12:8080/api/users";

function SignIn() {
    const [users, setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Función para obtener los usuarios
    function fetchUsers() {
        axios.get(baseURL, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            const users = res.data;
            setUser({ users });
            sessionStorage.setItem('users', JSON.stringify(users));
            console.log(users); // Asegúrate de que 'users' esté definido en este contexto
        }).catch(error => {
            console.error('Error al obtener los usuarios:', error);
        });
    }

    useEffect(() => {
        fetchUsers();
    }, []); // Array de dependencias vacío para ejecutar solo una vez

    const handleTryLogin = (event) => {
        event.preventDefault(); // Prevent form submission
        let userExists = false;

        console.log(users.users[1].email + 'Mail del usuario 1');
        console.log(email);
        // Bucle for para iterar sobre los usuarios
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].email === email) {
                userExists = true;
                break; // Salir del bucle una vez que se encuentra el usuario
            }
        }

        if (userExists) {
            console.log('User exists');
            // Add logic to handle successful login
        } else {
            console.log('User does not exist');
            // Add logic to handle unsuccessful login
        }
    }

    return (
        React.createElement('div', { className: 'main-container' },
            Logo('resources/logotipoWeb.png'),
            NavMenu(),
            NavRoute(),
            React.createElement('div', { className: 'sign-container' },
                React.createElement('div', { className: 'data-container' },
                    TitleForm('Sign in'),
                    React.createElement('form', { className: 'form-container', onSubmit: handleTryLogin },
                        React.createElement('div', { className: 'signform-container' },
                            InputText('Nombre de usuario / Correo electronico', setEmail),
                            InputText('Contraseña', setPassword),
                            AddButton('Identificar', handleTryLogin)
                        ),
                    ),
            React.createElement('form', {className: 'form-container1'},
                React.createElement('div', {className: 'signform-container'},
                    React.createElement('p', {className: 'texto'},'No tienes cuenta?'),
                    React.createElement(Link, { to: "/SignUp", className: "menu-link link"  },
                    React.createElement('p', null, 'Registrate')
                    ),
                    React.createElement('br', null),
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
