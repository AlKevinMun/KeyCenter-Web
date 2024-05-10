import React from "react";

function AddButton(name, nameClass ,onClick) {

  return (
    React.createElement('div', { className: nameClass, onClick: onClick },
      React.createElement('p', { type: 'button', className: 'button-label' }, name)
    )
  );
}

export default AddButton;