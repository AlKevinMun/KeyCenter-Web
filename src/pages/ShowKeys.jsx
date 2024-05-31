import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";
import AddButton from "../components/AddButton.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import EditKey from "../components/EditKey.jsx"; // Asumiendo que existe un componente para editar llaves
import { getKeyById, getUser, getQrById, deleteKey, putKey } from "../service/Axios.jsx"; // Asumiendo que hay funciones para interactuar con llaves

function ShowKeys() {
  const { keyId } = useParams();
  const [key, setKey] = useState(null);
  const [users, setUsers] = useState([]); // Almacenar todos los usuarios
  const [nameUser, setNameUser] = useState(null); // Almacenar el nombre del usuario correspondiente
  const [qr, setQR] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false); //Estado para gestionar la visibilidad del modal de edición.
  const [showCameraButtons, setShowCameraButtons] = useState(false); //Estado para controlar la visibilidad de los botones de la cámara
  const KeyRef = useRef({
    "user_id": 1,
  });
  const videoRef = useRef();

  let keyState = '';

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

  // Función para obtener la llave que se va a mostrar
  useEffect(() => {
    const obtenerKey = async () => {
      try {
        const response = await getKeyById(keyId);
        setKey(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener la llave:", error);
      }
    };
    // Función para obtener los usuarios
    const obtenerUsuarios = async () => {
      try {
        const response = await getUser();
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    obtenerKey();
    obtenerUsuarios();
  }, [keyId]);

  // Función para obtener el qr por ID de la llave
  useEffect(() => {
    const obtenerQR = async () => {
      try {
        const response = await getQrById(key.qr_id);

        const qrImageUrl = base64ToUrl(response.data);
        setQR(qrImageUrl);
      } catch (error) {
        console.error("Error al obtener el QR:", error);
      }
    };

    if (key) {
      obtenerQR();
    }
  }, [key]);

  // Función para obtener el usuario que tenga la llave
  useEffect(() => {
    if (key) {
      const userMatch = users.find(user => user.id === key.user_id);
      if (userMatch) {
        setNameUser(userMatch.username);
      }
    }
  }, [users, key]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se espera la incidencia
  }

  // Metodo para saber el estado actual de la llave
  if (key.user_id !==1) { keyState= 'Ocupado' }
  else if (key.user_id === 1) { keyState = 'Disponible' }

  // Función para determinar el formato de salida del tiempo
  const formattedDate = new Date(key.hora).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Función para borrar
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta llave?")) {
      try {
        await deleteKey(keyId);
        setSuccessMessage('Llave eliminada con éxito.');
        setTimeout(() => setSuccessMessage(''), 2000);
        const estimatedWaitTime = 3000;
        setTimeout(() => {
          window.history.go(-1);
        }, estimatedWaitTime);
      } catch (error) {
        console.error("Error al borrar la llave:", error);
      }
    }
  };

  const handleLeave = (e) => {
    e.preventDefault();
    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    putKey(JSON.stringify(KeyRef.current), key.id)
     .then(response => {
        // Se resetean los valores del UseRef
        setTimeout(() => {
          window.location.reload(); // Hace un refresh a la página tras 1 segundo
        }, 1000);
        handleSuccessfulEdit('Llave almacenada con éxito.'); // Sale la pequeña notificación.
      })
     .catch(error => {
        console.error('Error al traspasar la llave:', error);
     });
  };

  // Función para determinar el color del texto basado en el status
  const getStatusColor = () => {
      switch (keyState) {
          case 'Disponible':
              return 'green';
          case 'Ocupado':
              return 'red';
          default:
              return 'black';
      }
  };

  // Función para manejar la operación de edición exitosa
    const handleSuccessfulEdit = (message) => {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(''), 2000); // Clear the message after 2 seconds
      // Refresh the list of incidents here if needed
    };

  const statusStyle = { color: getStatusColor() };

    // Función para manejar el click en el botón de escanear
    const handleScanButtonClick = () => {
      setShowCameraButtons(true);
    };

    // Función para manejar el acceso a la cámara
    const handleCameraAccess = async (buttonID) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Aquí puedes usar el stream para mostrar la vista previa de la cámara o procesar el video
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error al acceder a la cámara", err);
      }
    };

  // Metodo para saber si el usuario activo es el mismo que el de la llave

  if(currentUserId === key.user_id) sameUser = true;
return React.createElement('div', { className: 'main-container', style: require('../style.css') },
    Logo('../../resources/logotipoWeb.png'),
    React.createElement(NavMenu),
    React.createElement(NavRoute),
    React.createElement('div', { className: 'content-containet' },
      React.createElement('div', { className: 'folders-container' },
        React.createElement(FolderTree)
      ),
      React.createElement('div', { className: 'data-container' },
        React.createElement('div', { className: 'IncidenceMore' }, // Usando la misma clase que en ShowIncidence
          React.createElement('div', { className: 'IncidenceMore_Content' },
            TitleForm(key.room_name),
            React.createElement('div', { className: 'IncidenceMore_DescriptionGeneral'},
              React.createElement('p', { className: 'IncidenceMore_Date' }, 'Creada el: ', formattedDate),
              React.createElement('p', { className: 'IncidenceMore_Status', style: statusStyle }, keyState),
              React.createElement('p', { className: 'IncidenceMore_Description' }, 'Sala: ', key.id +" - "+ key.room_name),
              React.createElement('p', { className: 'IncidenceMore_User' }, 'Asignada a: ', nameUser),
              React.createElement('div',{className: 'qr-container'},
                qr && React.createElement('img', { src: qr, alt: 'QR Code', className: 'qr-code-image' }), // Muestra la imagen del QR
              ),
              React.createElement('video', { ref: videoRef, autoPlay: true, muted: true }),
              admin && AddButton('Traspasar llave', 'button-group IncidenceMore_ButtonEdit', openEditModal),
              sameUser && AddButton('Dejar llave', 'button-group IncidenceMore_ButtonLeave', handleLeave),
              AddButton('Escanear QR', 'button-group IncidenceMore_ButtonScan', handleScanButtonClick),
              admin && AddButton('Borrar llave', 'button-group IncidenceMore_ButtonDelete', handleDelete),
              showCameraButtons && AddButton('Recoger llave', 'button-group IncidenceMore_ButtonPick', handleCameraAccess),
              showCameraButtons && AddButton('Traspasar llave via QR', 'button-group IncidenceMore_ButtonEditQR', handleCameraAccess),
            ),
          ),
        ),
      ),
      React.createElement('div', { className: 'service-keys-container' },
        React.createElement(ServiceKey),
      ),
        successMessage && React.createElement(SuccessMessage, { message: successMessage, isVisible: true }),
        keyId && <EditKey isOpen={isEditing} onClose={closeEditModal} onRefresh={null} onSuccess={handleSuccessfulEdit} keyID={keyId} />
    )
  );
}

export default ShowKeys;
