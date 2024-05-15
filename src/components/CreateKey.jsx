import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx"
import { postIncidence } from "../service/Axios.jsx";

const CreateKey = ({ isOpen, onClose }) => {
  // Correctly use useRef to create a ref object
  const KeyRef = useRef({
    "id": '', // Identificador del aula, por ejemplo, 2.02 y es la de la clase de 4.5 de la ESO
    "room_name": '',
    "cantidad": 0
  });

  const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if (name === 'Identificador') { newName = "id"; }
    else if (name === 'Nombre del aula') { newName = "room_name"; }
    else if (name === 'Cantidad de llaves') { newName = "cantidad"; }

    console.log(newValue);
    console.log(newName);
    console.log(keyRef.current[newName] = newValue);
    IncidenceRef.current[newName] = newValue;
  }



  const handleSubmit = (e) => {
    e.preventDefault();

      .catch(error => {
        console.error('Error al crear la incidencia:', error);
      });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return React.createElement('div', { className: 'dialog-overlay' },
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
  );
};

export default CreateIncidence;
