import React from "react";
/*
* El siguiente componente se trata del componente para el logo de la pagina web.
* A la hora de crear el componente se debe insertar la ruta de la imagen y el className para el logo.
*/
function Logo(ruta, className) {
  return (
    React.createElement('div', { className: 'logo-container' },
      React.createElement('img', { className: className, src: ruta }, null),
    )
  );
}

export default Logo;
