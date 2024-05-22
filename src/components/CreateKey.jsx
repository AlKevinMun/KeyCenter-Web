import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx"
import { postIncidence } from "../service/Axios.jsx";
import Alert from './Alert';
/*
* El siguiente componente se trata de una ventana emergente para crear específicamente una llave. Se intento crear
* Como una ventana emergente global, pero no era posible por la diferencia de campos entre todos los objetos.
* Para invocar este componente se requiere pasarle un booleano que indica si esta, o no abierto/visible.
* Una  una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
* Una función que actualiza todas las incidencias una vez creada la nueva, y una llamada a una función para establecer
* un comportamiento si funciona todo con exito.
*/
const CreateKey = ({ isOpen, onClose }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación de la llave.
  const KeyRef = useRef({
    "id": '',
    "room_name": '',
    "cantidad": 0
  });
  /*
  * Esta constante actua como función. Lo que hace es comprobar que inputText has modificado (el valor name) y event
  * es el valor que has escrito. Almacena este valor en el useRef que corresponda.
  */
  const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if (name === 'Identificador') { newName = "id"; }
    else if (name === 'Nombre del aula') { newName = "room_name"; }
    else if (name === 'Cantidad de llaves') { newName = "cantidad"; }

    console.log(newValue);
    console.log(newName);
    console.log(keyRef.current[newName] = newValue);
    IncidenceRef.current[newName] = newValue;
  }

  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado la incidencia con exito. También se manejan los errores en dicha
  * función.
  */
  /*
   * TO DO
   * Toda la función de handleSubmit, junto al uso del alert.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

      .catch(error => {
        console.error('Error al crear la incidencia:', error);
      });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return React.createElement('div', { className: 'dialog-overlay' },
    React.createElement('div', { className: 'dialog-content' },
      React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
      React.createElement('h2', null, 'Crear Nuevo Asunto'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('label', { className: 'dialog-title' }, 'Asunto',),
        React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Asunto') }),
        React.createElement('br'),
        React.createElement('label', { className: 'dialog-title' }, 'Descripcion',),
        React.createElement('textarea', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Descripcion') }),
        React.createElement('br'),
        React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
      )
    )
  );
};

export default CreateIncidence;
