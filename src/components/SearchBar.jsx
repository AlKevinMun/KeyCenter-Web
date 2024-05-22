import React from "react";
/*
* El siguiente componente se una barra de búsqueda.
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar como placeholder.
*/
function SearchBar(placeholder) {
  return (
    React.createElement('div', { className: 'SearchBar-container' },
      React.createElement('form', null,
        React.createElement('input', { type: 'text', className: 'input-search', placeholder: placeholder }),
        React.createElement('input', { type: 'button', className: 'button-search', value: 'Cerca' })
      )
    )
  );
}

export default SearchBar;