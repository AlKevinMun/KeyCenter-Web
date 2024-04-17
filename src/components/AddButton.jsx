import React from "react";

function AddButton(name) {

let a;

    if (name === "Canvia la contrasenya" || name === "Obté el nom d’usuari") {
        a = 'button-group1';
    } else {
        a = 'button-group';
    }

  return (
     React.createElement('div', { className: a},
       React.createElement('p', { className: 'button-label' }, name)
     )
  );
 }
 
  export default AddButton;