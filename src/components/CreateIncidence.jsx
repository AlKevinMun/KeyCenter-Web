import React, { useState, useRef } from 'react';
import  InputText from "./InputText.jsx"
import { postIncidence } from "../service/Axios.jsx";

const CreateIncidence = ({ isOpen, onClose }) => {
     // Correctly use useRef to create a ref object
 const IncidenceRef = useRef({
    "topic": '',
    "description": '',
    "user_id": 2
 });

const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if(name==='Asunto'){newName="topic";}
    else if (name ==='Descripcion'){newName="description";}

    console.log(newValue);
    console.log(newName);
    console.log(IncidenceRef.current[newName] = newValue);
    IncidenceRef.current[newName] = newValue;
}



 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Asunto:', IncidenceRef.current.topic);
    console.log('Descripción:', IncidenceRef.current.description);
    console.log(IncidenceRef.current);
    postIncidence(JSON.stringify(IncidenceRef.current))
          .then(response => {
            console.log('Incidencia creada con ID:', response.data.id);
            onClose();
          })
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
        React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Asunto')  }),
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
