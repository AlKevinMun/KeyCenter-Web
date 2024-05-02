import React from "react";

function AddButton(name, onClick) {

  let clas

  if (name === "Canvia la contrasenya" || name === "Obté el nom d’usuari") {
    clas = 'button-group1';
  } else {
    clas = 'button-group';
  }

  return (
    React.createElement('div', { className: clas },
      React.createElement('p', { type: 'button', className: 'button-label', onClick: onClick }, name)
    )
  );
}

export default AddButton;