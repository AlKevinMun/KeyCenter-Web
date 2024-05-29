import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx"
import { postUser } from "../service/Axios.jsx";
import InputSelector from "./InputSelector.jsx"
import Alert from './Alert';

/*
* El siguiente componente se trata de una ventana emergente para crear específicamente un usuario. Se intento crear
* Como una ventana emergente global, pero no era posible por la diferencia de campos entre todos los objetos.
* Para invocar este componente se requiere pasarle un booleano que indica si esta, o no abierto/visible.
* Una  una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
* Una función que actualiza todas las incidencias una vez creada la nueva, y una llamada a una función para establecer
* un comportamiento si funciona todo con exito.
*/
const CreateUser = ({ isOpen, onClose }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación del usuario.
  const UserRef = useRef({
    "username": '',
    "password": '',
    "email": '',
    "rol": 'Admin'
  });

  const [showAlert, setShowAlert] = useState(false); // useState para controlar la visibilidad del componente de alerta.
  const [msgError, setMsgError] = useState(''); // useState para almacenar el mensaje de error.

  /*
  * Almacena las opciones que tiene el InputSelector
  */
  const [stateOptions, setStateOptions] = useState([
    { value: 'Admin', label: 'Admin' },
    { value: 'Usuario', label: 'Usuario' },
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
    else if (name === 'Correo electronico') { newName = "email"; }
    else if (name === 'Rol') { newName = "rol"; }

    UserRef.current[newName] = newValue;
  }

  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado la incidencia con exito. También se manejan los errores en dicha
  * función.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!UserRef.current.username.trim() || !UserRef.current.password.trim() || !UserRef.current.email.trim()) {
      if(!UserRef.current.username){setMsgError('No se puede crear el usuario sin su nombre')}
      else if(!UserRef.current.password){setMsgError('No se puede crear el usuario sin su contraseña.')}
      else if(!UserRef.current.email){setMsgError('No se puede crear el usuario sin su correo electronico.')}
      if(!UserRef.current.username && !UserRef.current.password || !UserRef.current.username && !UserRef.current.email || !UserRef.current.password && !UserRef.current.email){setMsgError('No se puede crear la llave con los campos vacios.')}
      setShowAlert(true); // Muestra el componente de alerta si algún campo está vacío
      return; // Evita continuar con la llamada a postIncidence
    }
    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    postUser(JSON.stringify(UserRef.current))
      .then(response => {
        console.log('Usuario creadado con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        window.location.reload(); // Actualiza la paguina para mostrar la nueva creada
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
      });
    onClose();
  };

  // Solo cierra el diálogo si showAlert es falso
  const handleClose = () => {
    onClose();
  };

  // Comprobacion de si Alert esta cerrado
  if (!isOpen) {
    return null;
  }

  // Constante para actualizar el valor rol cada vez que lo cambian en el InputSelector
  const handleSelectorChange = (newValue) => {
      UserRef.current.rol = newValue;
  };

  return(
    <>
      {showAlert && <Alert msgError={msgError} isOpen={true} onClose={() => setShowAlert(false)} />}
        {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
          React.createElement('div', { className: 'dialog-content' },
            React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
            React.createElement('h2', null, 'Crear Nuevo Usuario'),
            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('label', { className: 'dialog-title' }, 'Nombre',),
              React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Nombre') }),
              React.createElement('br'),
              React.createElement('label', { className: 'dialog-title' }, 'Contraseña',),
              React.createElement('input', { className: 'dialog-description', type: 'password', onBlur: handleOnChange.bind(null, 'Contraseña') }),
              React.createElement('br'),
              React.createElement('label', { className: 'dialog-title' }, 'Correo electronico',),
              React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Correo electronico') }),
              React.createElement('br'),
              React.createElement('label', { className: 'dialog-title' }, 'Rol',),
              React.createElement('br'),
              React.createElement(InputSelector, {name: 'Estado', data: stateOptions, onChange: handleOnChange.bind(null, 'Rol'), onBlur: null, id: `Estados`}),
              React.createElement('br'),
              React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
            )
          )
        )
      )}
    </>
  );

};

export default CreateUser;
