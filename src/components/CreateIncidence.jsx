import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx";
import { postIncidence } from "../service/Axios.jsx";
import Alert from './Alert'; // Asegúrate de importar el componente Alert

const CreateIncidence = ({ isOpen, onClose, onRefresh, onSuccess }) => {
  const IncidenceRef = useRef({
    "topic": '',
    "description": '',
    "user_id": 1
  });
  const [showAlert, setShowAlert] = useState(false); // Estado local para controlar la visibilidad del componente de alerta
  const [msgError, setMsgError] = useState('');
  const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if (name === 'Asunto') { newName = "topic"; }
    else if (name === 'Descripcion') { newName = "description"; }

    IncidenceRef.current[newName] = newValue;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!IncidenceRef.current.topic.trim() ||!IncidenceRef.current.description.trim()) {
      if(!IncidenceRef.current.topic){setMsgError('No se puede enviar la incidencia sin un asunto.')}
      else if(!IncidenceRef.current.description){setMsgError('No se puede enviar la incidencia sin una descripción.')}
      if(!IncidenceRef.current.topic && !IncidenceRef.current.description){setMsgError('No se puede enviar la incidencia con los campos vacios.')}
      setShowAlert(true); // Muestra el componente de alerta si algún campo está vacío
      return; // Evita continuar con la llamada a postIncidence
    }

    postIncidence(JSON.stringify(IncidenceRef.current))
     .then(response => {
        console.log('Incidencia creada con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        onRefresh();
        IncidenceRef.current.topic = '';
        IncidenceRef.current.description = '';
        onSuccess('Incidencia creada con éxito.');
      })
     .catch(error => {
        console.error('Error al crear la incidencia:', error);
      });
  };

  const handleClose = () => {
    // Solo cierra el diálogo si showAlert es falso
    if (!showAlert) {
      onClose();
    }
  };

  // Mostrar el componente de alerta si showAlert es verdadero
  return (
    <>
      {showAlert && <Alert msgError={msgError} isOpen={true} onClose={() => setShowAlert(false)} />}
      {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
          React.createElement('div', { className: 'dialog-content' },
            React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
            React.createElement('h2', null, 'Crear Nuevo Asunto'),
            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('label', { className: 'dialog-title' }, 'Asunto',),
              React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Asunto') }),
              React.createElement('br'),
              React.createElement('label', { className: 'dialog-title' }, 'Descripcion',),
              React.createElement('textarea', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Descripcion') }),
              React.createElement('br'),
              React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
            )
          )
        )
      )}
    </>
  );
};

export default CreateIncidence;
