import React from "react";

function SearchBar() {
  return (
    React.createElement('div', { className: 'SearchBar-container' },
      React.createElement('form', null,
        React.createElement('input', { type: 'text', className: 'input-search', placeholder: 'Buscar Incidencias' }),
        React.createElement('input', {type: 'button', className: 'button-search', value: 'Cerca'})
      )
    )
  );
}

export default SearchBar;