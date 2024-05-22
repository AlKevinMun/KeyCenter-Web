import React from "react";
/*
* El siguiente componente se trata del componente de los input-text comunes
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el botón (name), una función
* que se activara cuando se modifique el componente, y la posibilidad de añadir algún prop adicional.
*/
function InputText(name, onChange, extraProps = {}) {
  return (
    React.createElement('div', { className: 'input-group' },
      React.createElement('label', { className: 'input-label' }, name),
      React.createElement('input', { type: extraProps.type || 'text', className: 'input', name: name.toLowerCase(), onBlur: onChange })
    )
  );
}

export default InputText;