import React, { useState, useEffect } from "react";

function InputSelector({name, data, onChange, onBlur, id}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (id === 'Estados') {
      const newOptions = data.map((option, index) => React.createElement('option', { key: index, value: option.value }, option.label));
      setOptions(newOptions);
    }
    // Aquí puedes agregar más lógica para otros casos si es necesario
  }, [id, data]); // Aseguramos que el efecto se ejecute cuando cambie id o data

  let optionsToRender = [];
  if (id === 'Estados') {
    optionsToRender = options;
      if (id === 'Estados') {
        return (
          React.createElement('div', { className: 'input-group2', id: id },
            React.createElement('label', { className: 'input-label' }),
            React.createElement('select', { className: 'input', name: name.toLowerCase(), onChange: onChange, onBlur: onBlur },
              optionsToRender
            )
          )
        );
      }
    }
  }
export default InputSelector;

