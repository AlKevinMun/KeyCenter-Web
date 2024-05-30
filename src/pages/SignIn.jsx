import React, { useState, useRef } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import TitleForm from "../components/TitleForm.jsx";
import InputText from "../components/InputText.jsx";
import AddButton from "../components/AddButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUserByEmail } from "../service/Axios.jsx";
import Alert from '../components/Alert'; // Asegúrate de importar el componente Alert

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false); // Agrega estado para la alerta
    const [msgError, setMsgError] = useState(''); // Agrega estado para el mensaje de error
    const LoginRef = useRef({
        "email": '',
        "password": ''
    });
    const navigate = useNavigate();

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
            const response = await auth(LoginRef.current);
            console.log(response.data);

            // Guarda el token y el correo electrónico en sessionStorage
            sessionStorage.setItem('token', response.data);
            const response1 = await getUserByEmail(email);
            console.log(response1.data);
            sessionStorage.setItem('loginUser', JSON.stringify(response1.data));

            navigate('/');
        } catch (error) {
            console.error(error);
               if (error.response && error.response.status === 401) {
                   // Si el error es específicamente un error de autenticación (código de estado 401), muestra el alerta
                   setMsgError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
                   setShowAlert(true); // Activa la alerta con el mensaje de error
               } else {
                   // Maneja otros tipos de errores aquí si es necesario
                   setMsgError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
                   setShowAlert(true); // También puedes activar la alerta para otros tipos de errores si es necesario
               }
        }
    };

    return (
        <>
          {showAlert && <Alert msgError={msgError} isOpen={true} onClose={() => setShowAlert(false)} />}
            {
            React.createElement('div', { className:'main-container' },
              Logo('resources/logotipoWeb.png'),
              NavMenu(),
              NavRoute(),
              React.createElement('div', { className:'sign-container' },
                  React.createElement('div', { className: 'data-container' },
                      TitleForm('Iniciar sesión'),
                      React.createElement('form', { className: 'form-container', onSubmit: handleSubmit },
                          React.createElement('div', {className: 'signform-container' },
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
            )}
        </>
    )
}

export default SignIn;
