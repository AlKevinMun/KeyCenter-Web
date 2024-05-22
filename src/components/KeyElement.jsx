import React from "react";
/*
* El siguiente componente se trata del componente de las llaves que salen en ServiceKeys.
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el botón (name) y la ruta
* hacia donde se encuentra el icono de llave.
*/
function KeyElement({ name, icon }) {
  let newName = 'Num. del aula: '+ name;
    return (
        React.createElement('div', { className: 'key-element-container' },
            React.createElement('li', { className: 'key-element' },
                React.createElement('img', { className: 'folder-icon key-icon', src: icon, alt: name }),
                React.createElement('p', { className: 'folder-text' }, newName),
            ),
        ));
}

export default KeyElement;
