import React from "react";
/*
* El siguiente componente se trata de un campo de texto amplio, también conocido compo textArea.
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el label (name) y un método
* para que se almacenen los datos insertados en el textArea.
*/
function TextArea(name, onChange) {
  return (
    React.createElement('div', { className: 'textarea-group' },
      React.createElement('label', { className: 'textarea-label' }, name),
      React.createElement('textarea', { className: 'textarea', name: name.toLowerCase(), onBlur: onChange })
    )
  );
}

export default TextArea;