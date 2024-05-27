import React from 'react';
/*
* El siguiente componente se trata de una ventana emergente que saldría solamente si alguna operación diera un error.
* A la hora de crear el componente se debe insertar una string con el mensaje que se mostrara en esta ventana emergente,
* un booleano para saber si esta ventana se mostrara o no, y una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
*/
const Alert = ({msgError, isOpen, onClose}) => {

  let tituloAlert = "";
  if(msgError === "Debes iniciar sesión para acceder a esta página.")
  {tituloAlert='Falta de autorización'; console.log("jaja bobo")}
  else{tituloAlert="Faltan campos por rellenar"}
  if (!isOpen) {
    return null;
  }

  return React.createElement('div', { className: 'alert-overlay' },
    React.createElement('div', { className: 'dialog-content' },
      React.createElement('h1', null, tituloAlert),
      React.createElement('p', { className: 'dialog-text' }, msgError),
      React.createElement('br'),
      React.createElement('button', { className: 'button-group dialog-button', type: 'submit', onClick: onClose }, 'Aceptar')
    )
  );
};

export default Alert;