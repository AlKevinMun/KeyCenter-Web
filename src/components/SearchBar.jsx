import React, { useState } from "react";

function SearchBar({ placeholder, onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue); // Llama a la función pasada como prop para actualizar los elementos filtrados
    setSearchValue(''); // Limpia el campo de búsqueda después de enviar
  };

  return (
    React.createElement('div', { className: 'SearchBar-container' },
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('input', {
          type: 'text',
          className: 'input-search',
          placeholder: placeholder,
          value: searchValue,
          onChange: handleInputChange
        }),
        React.createElement('input', {
          type: 'submit',
          className: 'button-search',
          value: 'Buscar'
        })
      )
    )
  );
}

export default SearchBar;