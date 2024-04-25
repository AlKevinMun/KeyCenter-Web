// src/components/Dialog.js
import React, { useState } from 'react';

const CreateIncidence = ({ isOpen, onClose }) => {
 const [subject, setSubject] = useState('');
 const [description, setDescription] = useState('');

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Asunto:', subject);
    console.log('Descripción:', description);
    // Aquí puedes agregar la lógica para guardar la información
    onClose();
 };

 if (!isOpen) {
    return null;
 }

 return React.createElement('div',{ className: 'dialog-overlay' },
    React.createElement('div',{ className: 'dialog-content' },
      React.createElement('h2', null, 'Crear Nuevo Asunto'),
      React.createElement('form',{ onSubmit: handleSubmit },
        React.createElement('label',{ className: 'dialog-title' },'Asunto de la incidencia:',),
        React.createElement('input', { className: 'dialog-description', type: 'text',value: subject, onChange: (e) => setSubject(e.target.value),}),
        React.createElement('br'),
        React.createElement('label', { className: 'dialog-title' }, 'Descripción:',),
        React.createElement('textarea', { className: 'dialog-description', value: description, onChange: (e) => setDescription(e.target.value),}),
        React.createElement('br'),
        React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
      )
    )
 );
};

export default CreateIncidence;
