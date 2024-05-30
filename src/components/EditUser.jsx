import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx"
import InputSelector from "./InputSelector.jsx"
import { putUser } from "../service/Axios.jsx";
/*
* El siguiente componente se trata de una ventana emergente para editar específicamente un usuario. Se intento crear
* Como una ventana emergente global, pero no era posible por la diferencia de campos entre todos los objetos.
* Para invocar este componente se requiere pasarle un booleano que indica si esta, o no abierto/visible.
* Una  una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
* Una función que actualiza todas las incidencias una vez creada la nueva, y una llamada a una función para establecer
* un comportamiento si funciona todo con exito.
*/
const EditUser = ({ isOpen, onClose, onSuccess, userID }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación del usuario.
  const UserRef = useRef({
    "username": '',
    "password": '',
    "email": '',
    "rol": ''
  });

  /*
  * Comprobacion de si el usuario actual es admin
  */
  let admin = false;
  if (userID === '1') admin = true;

  /*
  * Almacena las opciones que tiene el InputSelector
  */
  const [stateOptions, setStateOptions] = useState([ //useState para controlar la visibilidad del componente de alerta.
        { value: 'Admin', label: 'Admin' },
        { value: 'Usuario', label: 'Usuario' }
  ]);

  /*
  * Constantes que actua como función. Lo que hace es comprobar que inputText/InputSelector has modificado (el valor name) y event
  * es el valor que has escrito. Almacena este valor en el useRef que corresponda.
  */
  const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if (name === 'Nombre') { newName = "username"; }
    else if (name === 'Contraseña') { newName = "password"; }
    else if (name === 'Rol') { newName = "rol"; }

    UserRef.current[newName] = newValue;
  }
  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado el usuario con exito. También se manejan los errores en dicha
  * función.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(UserRef.current)
    // Utiliza la función del axios para mandar el usuario a la base de  datos.
    putUser(JSON.stringify(UserRef.current), userID)
      .then(response => {
        console.log('Usuario modificado con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        setTimeout(() => {
                  window.location.reload(); // Hace un refresh a la página tras 1 segundo
        }, 1000);
        onSuccess('Usuario editado con éxito.'); // Sale la pequeña notificación.
      })
      .catch(error => {
        console.error('Error al modificar el usuario:', error);
      });
  };

  const handleClose = () => {
    // Solo cierra el diálogo si showAlert es falso
    console.log(onClose);
    onClose();
  };

  if (!isOpen) return null; // No renderizar nada si el modal debe estar cerrado

  // Constante para actualizar el valor rol cada vez que lo cambian en el InputSelector
  const handleSelectorChange = (newValue) => {
        UserRef.current.rol = newValue;
    };

  // Mostrar el componente de alerta si showAlert es verdadero
  return React.createElement('div', { className: 'dialog-overlay' },
    React.createElement('div', { className: 'dialog-content' },
      React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
      React.createElement('h2', null, 'Editar Usuario'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('label', { className: 'dialog-title' }, 'Nombre',),
        React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Nombre') }),
        React.createElement('br'),
        !admin && React.createElement('label', { className: 'dialog-title' }, 'Contraseña',),
        !admin && React.createElement('input', { className: 'dialog-description', type: 'password', onBlur: handleOnChange.bind(null, 'Contraseña') }),
        !admin && React.createElement('br'),
        !admin && React.createElement('label', { className: 'dialog-title' }, 'Rol',),
        !admin && React.createElement('br'),
        !admin && React.createElement(InputSelector, {name: 'Estado', data: stateOptions, onChange: handleOnChange.bind(null, 'Rol'), onBlur: null, id: `Estados`}),
        React.createElement('br'),
        React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
      )
    )
  );
};

export default EditUser;
