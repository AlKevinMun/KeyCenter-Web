import React from "react";

function InputDate(name, onChange) {
  let realName = name.toLowerCase();
  if (name === "Fecha de nacimiento") realName = "fechaNacimiento";
  return (
    React.createElement('div', { className: 'input-group' },
      React.createElement('label', { className: 'input-label' }, name),
      React.createElement('input', { type: 'date', className: 'input', name: realName, onChange: onChange })
    )
  );
}

export default InputDate;