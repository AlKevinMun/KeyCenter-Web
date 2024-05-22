import React from 'react';
/*
* El siguiente componente se trata de una ventana emergente para indicar que se a realizado la acción sin fallos.
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el mensaje (message) y también
* se le pasa un booleano para identificar si se puede o no mostrar en este momento.
*/
const SuccessMessage = ({ message, isVisible }) => {
  if (!isVisible) return null;
  console.log(isVisible);
  console.log(message);

  return (
    React.createElement('div', {className: 'success-message'},
      React.createElement('p', {className: 'success-text'}, message)
    )
  );
}
export default SuccessMessage;