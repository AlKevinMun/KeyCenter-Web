import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";
import AddButton from "../components/AddButton.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import EditUser from "../components/EditUser.jsx";
import { getUserById, deleteUser, getQrById } from "../service/Axios.jsx";

function ShowUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [successMessage, setSuccessMessage] = useState('');
  const [qr, setQR] = useState([]);
  // Nueva variable de estado para gestionar la visibilidad del modal de edición.
  const [isEditing, setIsEditing] = useState(false);

  // Función para alternar la visibilidad modal de edición
  const openEditModal = () => {
    setIsEditing(true);
  };

  // Función para alternar la visibilidad modal de edición
  const closeEditModal = () => {
    setIsEditing(false);
  };

  // Función para alternar la visibilidad modal de edición
  const base64ToUrl = (base64) => {
    return `data:image/png;base64,${base64.data}`;
  };

  // Leer el rol del usuario desde sessionStorage
  const currentUserRole = sessionStorage.getItem('loginUser')? JSON.parse(sessionStorage.getItem('loginUser')).rol : '';
  let admin = false;
  const currentUserId = sessionStorage.getItem('loginUser')? JSON.parse(sessionStorage.getItem('loginUser')).id : '';
  let sameUser = false;
  if (currentUserRole === 'Admin') admin = true;
  let num1 = false;
  if (currentUserId === 1) num1 = true;

  // Función para obtener el usuario que se va a mostrar
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    obtenerUsuario();
  }, [userId]);

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

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se espera la incidencia
  }

  // Función para borrar el elemento
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar este usuario?")) {
      try {
        await deleteUser(userId);
        setSuccessMessage('Usuario eliminad con éxito.'); // Muestra el mensaje de éxito
        setTimeout(() => setSuccessMessage(''), 2000); // Oculta el mensaje después de 5 segundos
        const estimatedWaitTime = 3000;
        setTimeout(() => {
          window.history.go(-1);
        }, estimatedWaitTime);
      } catch (error) {
        console.error("Error al borrar el usuario:", error);
      }
    }
  };

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
            React.createElement('img', { src: '../../resources/logo.png', className: 'perfil-image', alt: 'perfil', className: 'perfil-image' }),
            React.createElement('p', { className: 'UserMore_Email' }, 'Correo electrónico: ', user.email),
            React.createElement('div',{className: 'qr-container'},
              qr && React.createElement('img', { src: qr, alt: 'QR Code', className: 'qr-code-image' }),
            ),
            !num1 && AddButton('Editar usuario', 'button-group UserMore_ButtonEdit', openEditModal),
            !num1 && AddButton('Borrar usuario', 'button-group UserMore_ButtonDelete', handleDelete),
          ),)
        ),
      ),
      React.createElement('div', { className: 'service-keys-container' },
        React.createElement(ServiceKey),
      ),
      successMessage && React.createElement(SuccessMessage, { message: successMessage, isVisible: true }),
      <EditUser isOpen={isEditing} onClose={closeEditModal} onSuccess={handleSuccessfulEdit} userID={userId} />
    )
  );
}

export default ShowUser;
