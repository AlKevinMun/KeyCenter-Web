import React, { useEffect, useState } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";
import AddButton from "../components/AddButton.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import TableList from "../components/TableList.jsx";
import { useNavigate } from "react-router-dom";
import { getUserById, getQrById, getKey } from "../service/Axios.jsx";

function Perfil() {

  const [keys, setKeys] = useState([]);
  const [user, setUser] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [qr, setQR] = useState([]);
  const navigate = useNavigate();

  // Variables para obtener el id del usuario actual
  let loginUserJson = sessionStorage.getItem('loginUser');
  let loginUserObj = loginUserJson? JSON.parse(loginUserJson) : null;
  let idUser = loginUserObj? parseInt(loginUserObj.id) : null;

  // Función para alternar la visibilidad modal de edición
  const base64ToUrl = (base64) => {
    return `data:image/png;base64,${base64.data}`;
  };

  // Función para obtener el usuario que se va a mostrar
  useEffect(() => {
      const obtenerUsuario = async () => {
        if (idUser) {
          try {
            const response = await getUserById(idUser);
            setUser(response.data);
          } catch (error) {
            console.error("Error al obtener el usuario:", error);
          }
        }
      };
    obtenerUsuario();
  }, [idUser]);

  useEffect(() => {
    refreshKeys();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const handleSubmit = async (event) => {
  event.preventDefault();
  // Borra el token y el correo electrónico de sessionStorage
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('loginUser');
  navigate('/');
  };

  // Función para obtener el qr por ID del usuario
  useEffect(() => {
    const obtenerQR = async () => {
      try {
        const response = await getQrById(user.qr_id);
        const qrImageUrl = base64ToUrl(response.data);
        setQR(qrImageUrl);
      } catch (error) {
        console.error("Error al obtener el QR:", error);
      }
    };

    if (user) {
      obtenerQR();
    }
  }, [user]);

  //Metodo de actualizacion de llaves
  const refreshKeys = async () => {
    try {
      const response = await getKey();
      setKeys(response.data);
    } catch (error) {
      console.error("Error al actualizar las llaves:", error);
    }
  };

  // Filtro de llaves para que solo salga el del usuario actual
  const filteredKeys = keys.filter(key => {
  return key.user_id === idUser;
  });

  // Función para manejar la operación de edición exitosa
  const handleSuccessfulEdit = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 2000); // Se quita el mensaje después de 2 segundos
  };

  return React.createElement('div', { className: 'main-container', style: require('../style.css') },
    Logo('../../resources/logotipoWeb.png'),
    React.createElement(NavMenu),
    React.createElement(NavRoute),
    React.createElement('div', { className: 'content-containet' },
      React.createElement('div', { className: 'folders-container' },
        React.createElement(FolderTree)
      ),
      React.createElement('div', { className: 'data-container' },
        React.createElement('div', { className: 'UserMore' },
          React.createElement('div', { className: 'UserMore_Content' },
            TitleForm(user.username),
            React.createElement('div', { className: 'UserMore_DescriptionGeneral'},
            React.createElement('p', { className: 'UserMore_Rol' }, user.rol),
            React.createElement('img', { src: '../../resources/logo.png', className: 'perfil-image', alt: 'perfil' }),
            React.createElement('p', { className: 'UserMore_Email' }, 'Correo electrónico: ', user.email),
            React.createElement('div',{className: 'qr-container'},
              qr && React.createElement('img', { src: qr, alt: 'QR Code', className: 'qr-code-image' }),
            ),
            React.createElement(TableList, { items: filteredKeys, refreshItems: refreshKeys }),
            AddButton('Cerrar sesión', 'button-group', handleSubmit)
          ),)
        ),
      ),
      React.createElement('div', { className: 'service-keys-container' },
        React.createElement(ServiceKey),
      ),
      successMessage && React.createElement(SuccessMessage, { message: successMessage, isVisible: true }),
    )
  );
}

export default Perfil;