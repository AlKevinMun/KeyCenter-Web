import React from "react";
/*
* El siguiente componente se trata del componente de los botones comunes
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el botón (name),
* la clase para el div del botón, y una función que ocurrirá al hacer click al botón.
*/
function AddButton(name, nameClass ,onClick) {

  return (
    React.createElement('div', { className: nameClass, onClick: onClick },
      React.createElement('p', { type: 'button', className: 'button-label' }, name)
    )
  );
}

export default AddButton;