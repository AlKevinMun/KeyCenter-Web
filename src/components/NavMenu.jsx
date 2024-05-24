import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Alert from './Alert'; // Importa el componente Alert

function NavMenu() {
    const navContainerStyle = {
        position: "-webkit-sticky", // Posicionamiento fijo en la parte superior
        position: "sticky",
        top: 0,
        zIndex: 1000 // Para asegurar que el menú se muestre sobre otros elementos
    };

    const [isAlertVisible, setIsAlertVisible] = useState(false); // Estado para controlar la visibilidad del Alert

    const showAlert = () => {
        setIsAlertVisible(true); // Función para mostrar el Alert
    };

    const closeAlert = () => {
        setIsAlertVisible(false); // Función para cerrar el Alert
    };

    // Verifica si el usuario está logueado
    const isLoggedIn = sessionStorage.getItem('loginUser')!== null;

    // Función para redirigir al inicio si el usuario no está logueado
    const redirectToHomeIfNotLoggedIn = () => {
        if (!isLoggedIn) {
            showAlert(); // Muestra el Alert si el usuario no está logueado
            return false; // Evita la navegación
        }
        return true; // Permite la navegación
    };

    // Función para determinar qué elementos mostrar basado en el rol del usuario
    const showElementBasedOnRole = (role) => {
        switch (role) {
            case 'Admin':
                return <li className="menu-element menu-users">
                           <Link to="/Usuarios" className="menu-link"><strong>Usuarios</strong></Link>
                       </li>;
            case 'Usuario':
                return <li className="menu-element">Elemento para usuarios</li>;
            default:
                return null; // No muestra nada si el rol no coincide con ninguno esperado
        }
    }

    // Asumiendo que tienes acceso al rol del usuario en algún lugar, por ejemplo, desde sessionStorage
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser')) || {};
    const role = loginUser.rol || '';

    return (
        <>
            {isAlertVisible && <Alert msgError="Debes estar logueado para acceder a esta página." onClose={closeAlert} />} {/* Muestra el Alert si isAlertVisible es true */}
            <nav className="nav-container" style={navContainerStyle}> {/* Contenedor del menú de navegación */}
                <div className="menu-container">
                    <ul className="menu-table">
                        <li className="menu-element">
                            <Link to="/" className="menu-link" onClick={redirectToHomeIfNotLoggedIn}><strong>Inici</strong></Link>
                        </li>
                        <li className="menu-element">
                            <Link to="/Llaves" className="menu-link" onClick={redirectToHomeIfNotLoggedIn}><strong>Llaves</strong></Link>
                        </li>
                        <li className="menu-element">
                            <Link to="/Incidencias" className="menu-link" onClick={redirectToHomeIfNotLoggedIn}><strong>Incidencias</strong></Link>
                        </li>
                        <li className="menu-element">
                            <Link to="/Manuales" className="menu-link"><strong>Manuales</strong></Link>
                        </li>
                        <li className="menu-element menu-login">
                            <Link to="/SignIn" className="menu-link"><strong>Log In</strong></Link>
                        </li>
                        {isLoggedIn && showElementBasedOnRole(role)} {/* Muestra elementos específicos basados en el rol del usuario si está logueado */}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavMenu;
