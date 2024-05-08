import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIncidenceById } from "../service/Axios.jsx";

function ShowIncidence() {
  const { incidenceId } = useParams();
  const [incidence, setIncidence] = useState(null);

  useEffect(() => {
    console.log(`La id de la incidencia: ${incidenceId}`);
    const obtenerIncidencia = async () => {
      try {
        const response = await getIncidenceById(incidenceId);
        //console.log('Respuesta completa:', response);
        //console.log(response.data, ' La incidencia');
        setIncidence(response.data);
        //console.log(incidence);
      } catch (error) {
        console.error("Error al obtener la incidencia:", error);
      }
    };

    // Asegurarse de que incidenceId está definido antes de llamar a obtenerIncidencia
    obtenerIncidencia();

  }, [incidenceId]); // Dependiendo del cambio en incidenceId

  if (!incidence) {
    return <div>Cargando...</div>;
  }

  const formattedDate = new Date(incidence.send_date).toLocaleString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return React.createElement('div', { className: 'IncidenceMore' },
    React.createElement('div', { className: 'IncidenceMore_Content' },
      React.createElement('h2', null, 'Detalles de la Incidencia'),
      React.createElement('p', { className: 'IncidenceMore_Title' }, 'Asunto:', incidence.topic),
      React.createElement('p', { className: 'IncidenceMore_Description' }, 'Descripción:', incidence.description),
      React.createElement('p', { className: 'IncidenceMore_Date' }, 'Fecha:', formattedDate),
      React.createElement('p', { className: 'IncidenceMore_Status' }, 'Estado:', incidence.state),
      React.createElement('p', { className: 'IncidenceMore_User' }, 'Usuario:', incidence.user_id), // Asumiendo que existe un campo user_id
    )
  );
};

export default ShowIncidence;
