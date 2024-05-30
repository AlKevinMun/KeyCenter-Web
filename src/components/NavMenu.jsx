import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from './Alert'; // Importa el componente Alert

function NavMenu() {
    const navContainerStyle = {
        position: "-webkit-sticky", // Posicionamiento fijo en la parte superior
        top: 0,
        zIndex: 500 // Para asegurar que el menú se muestre sobre otros elementos
    };

  const [showAlert, setShowAlert] = useState(false); // useState para controlar la visibilidad del componente de alerta.

    // Verifica si el usuario está logueado
    const isLoggedIn = sessionStorage.getItem('loginUser')!== null;
    const navigate = useNavigate();

    // Función para redirigir al inicio si el usuario no está logueado
    const redirectToHomeIfNotLoggedIn = () => {
        if (!isLoggedIn) {
            setShowAlert(true) // Muestra el Alert si el usuario no está logueado
            setTimeout(() => { // Espera un poco antes de navegar
                navigate('/');
            }, 1); // Espera medio segundo para dar tiempo a que el estado se actualice
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
                return;
            default:
                return null; // No muestra nada si el rol no coincide con ninguno esperado
        }
    }

  const showSignInLink = () => {
    if (isLoggedIn) {
      return (
        <li className="menu-element menu-login">
          <Link to="/Perfil" className="menu-link"><strong>Perfil</strong></Link>
        </li>
      );
    }
    else {
      return (
          <li className="menu-element menu-login">
              <Link to="/SignIn" className="menu-link"><strong>Iniciar sesión</strong></Link>
          </li>
      );
    }
  }

    // Asumiendo que tienes acceso al rol del usuario en algún lugar, por ejemplo, desde sessionStorage
    const loginUser = JSON.parse(sessionStorage.getItem('loginUser')) || {};
    const role = loginUser.rol || '';

    return (
        <>
            {!isLoggedIn && showAlert && <Alert msgError="Debes iniciar sesión para acceder a esta página." isOpen={true} onClose={() => setShowAlert(false)} />} {/* Muestra el Alert si isAlertVisible es true */}
            <nav className="nav-container" style={navContainerStyle}> {/* Contenedor del menú de navegación */}
                <div className="menu-container">
                    <ul className="menu-table">
                        <li className="menu-element">
                            <Link to="/" className="menu-link"><strong>Inici</strong></Link>
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
                        {showSignInLink()} {/* Muestra el enlace de Sign In si el usuario no está logueado o si no el Perfil de usuario */}
                        {isLoggedIn && showElementBasedOnRole(role)} {/* Muestra elementos específicos basados en el rol del usuario si está logueado */}
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavMenu;
