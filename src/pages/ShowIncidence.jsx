import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";
import AddButton from "../components/AddButton.jsx";
import { getIncidenceById, getUser, deleteIncidence } from "../service/Axios.jsx";

function ShowIncidence() {
  const { incidenceId } = useParams();
  const [incidence, setIncidence] = useState(null);
  const [users, setUsers] = useState([]); // Almacenar todos los usuarios
  const [nameUser, setNameUser] = useState(null); // Almacenar el nombre del usuario correspondiente
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const obtenerIncidencia = async () => {
      try {
        const response = await getIncidenceById(incidenceId);
        setIncidence(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener la incidencia:", error);
      }
    };

      const obtenerUsuarios = async () => {
        try {
          const response = await getUser();
          setUsers(response.data);
        } catch (error) {
          console.error("Error al obtener los usuarios:", error);
        }
      };

    obtenerIncidencia();
    obtenerUsuarios();
  }, [incidenceId]);

useEffect(() => {
  // Solo ejecutar el código si incidence no es null
  if (incidence) {
    // Buscar el usuario que coincide con incidenceUserId
    const userMatch = users.find(user => user.id === incidence.user_id);
    if (userMatch) {
      setNameUser(userMatch.username); // Asignar el nombre del usuario encontrado
    }
  }
}, [users, incidence]); // Asegúrate de incluir incidence como dependencia para que este efecto se ejecute cuando cambie


if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se espera la incidencia
  }

 if (incidence.state === 0) { incidence.state = 'Enviado' }
    else if (incidence.state === 1) { incidence.state = 'En curso' }
    else if (incidence.state === -1) { incidence.state = 'Finalizado' }

    // Función para determinar el color del texto basado en el status
    const getStatusColor = () => {
        switch (incidence.state) {
            case 'Enviado':
                return 'green';
            case 'En curso':
                return 'orange';
            case 'Finalizado':
                return 'red';
            default:
                return 'black';
        }
    };

  const formattedDate = new Date(incidence.send_date).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusStyle = { color: getStatusColor() };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar esta incidencia?")) {
      try {
        await deleteIncidence(incidenceId);
        const estimatedWaitTime = 1000;
        setTimeout(() => {
          window.history.go(-1);
        }, estimatedWaitTime);
      } catch (error) {
        console.error("Error al borrar la incidencia:", error);
      }
    }
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
        React.createElement('div', { className: 'IncidenceMore' },
          React.createElement('div', { className: 'IncidenceMore_Content' }, // Asegurándose de que la ruta sea correcta
            TitleForm(incidence.topic),
            React.createElement('div', { className: 'IncidenceMore_DescriptionGeneral'},
            React.createElement('p', { className: 'IncidenceMore_Date' }, 'Creado el: ', formattedDate),
            React.createElement('p', { className: 'IncidenceMore_Status', style: statusStyle }, incidence.state),
            React.createElement('p', { className: 'IncidenceMore_Description' }, incidence.description),
            React.createElement('p', { className: 'IncidenceMore_User' }, 'Creado por: ', nameUser),
            AddButton('Editar incidencia', 'button-group IncidenceMore_ButtonEdit', null),
            AddButton('Borrar incidencia', 'button-group IncidenceMore_ButtonDelete', handleDelete)
          ),)
        ),
      ),
      React.createElement('div', { className: 'service-keys-container' },
        React.createElement(ServiceKey),
      )
    )
  );
}

export default ShowIncidence;
