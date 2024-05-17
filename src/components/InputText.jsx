import React from "react";

function InputText(name, onChange, extraProps = {}) {
  return (
    React.createElement('div', { className: 'input-group' },
      React.createElement('label', { className: 'input-label' }, name),
      React.createElement('input', { type: extraProps.type || 'text', className: 'input', name: name.toLowerCase(), onBlur: onChange })
    )
  );
}

export default InputText;