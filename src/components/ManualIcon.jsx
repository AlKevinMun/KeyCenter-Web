import React from "react";
/*
* El siguiente componente se trata de uno para los iconos de los manuales
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el botón (name), la ruta de la
* imagen, y a la clase que se le quiere poner al texto.
*/
function ManualIcon(ruta, name, className) {
 return (
    React.createElement('div', { className: 'manual-container' },
      React.createElement('img', { className: null, src: ruta }, null),
      React.createElement('p', {className: className}, name))
 );
}

export default ManualIcon;
