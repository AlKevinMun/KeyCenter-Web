import React from 'react';

const Alert = ({msgError, isOpen, onClose}) => {

  if (!isOpen) {
    return null;
  }

  return React.createElement('div', { className: 'alert-overlay' },
    React.createElement('div', { className: 'dialog-content' },
      React.createElement('h1', null, 'Faltan campos por rellenar'),
      React.createElement('p', { className: 'dialog-text' }, msgError),
      React.createElement('br'),
      React.createElement('button', { className: 'button-group dialog-button', type: 'submit', onClick: onClose }, 'Aceptar')
    )
  );
};

export default Alert;