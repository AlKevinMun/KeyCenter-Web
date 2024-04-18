import React from "react";

function AddButton(name) {

let clas

    if (name === "Canvia la contrasenya" || name === "Obté el nom d’usuari") {
        clas = 'button-group1';
    } else {
        clas = 'button-group';
    }

  return (
     React.createElement('div', { className: clas},
       React.createElement('p', { type: 'button', className: 'button-label' }, name)
     )
  );
 }
 
  export default AddButton;