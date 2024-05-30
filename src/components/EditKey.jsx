import React, { useState, useRef, useEffect } from 'react';
import InputText from "./InputText.jsx";
import InputSelector from "./InputSelector.jsx"
import { getUser, putKey } from "../service/Axios.jsx";
import Alert from './Alert';
/*
* El siguiente componente se trata de una ventana emergente para editar específicamente una incidencia. Se intento crear
* Como una ventana emergente global, pero no era posible por la diferencia de campos entre todos los objetos.
* Para invocar este componente se requiere pasarle un booleano que indica si esta, o no abierto/visible.
* Una  una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
* Una función que actualiza todas las incidencias una vez creada la nueva, y una llamada a una función para establecer
* un comportamiento si funciona todo con exito.
*/
const EditKey = ({ isOpen, onClose, onRefresh, onSuccess, keyID }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación de la incidencia.
  const currentUserId = sessionStorage.getItem('loginUser')? JSON.parse(sessionStorage.getItem('loginUser')).id : '1';
  // Esta constante se trata del documento con los datos necesarios para la creación de la llave.
  const KeyRef = useRef({
    "user_id": currentUserId,
  });
  const [showAlert, setShowAlert] = useState(false); // useState para controlar la visibilidad del componente de alerta.
  const [userOptions, setUserOptions] = useState([]);

  /*
    * Esta constante actua como función. Lo que hace es comprobar los usuarios para
    * poder tener la opcion de dar la lista de usuarios actuales.
    */
  useEffect(() => {
    getUser()
     .then(users => {
        const formattedUserOptions = users.data.map(user => ({
          value: user.id,
          label: user.username
        }));
        setUserOptions(formattedUserOptions);
      })
     .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);


  /*
  * Esta constante actua como función. Lo que hace es comprobar que inputText has modificado (el valor name) y event
  * es el valor que has escrito. Almacena este valor en el useRef que corresponda.
  */
  const handleOnChange = (name, event) => {
    const { value } = event.target;
    let newValue = value;
    let newName = name;

    if (name === 'Usuario') { newName = "user_id"; }

    KeyRef.current[newName] = newValue; // Busca dentro de KeyRef el valor del newName y le da el valor escrito.
  }
  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado la incidencia con exito. También se manejan los errores en dicha
  * función.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    putKey(JSON.stringify(KeyRef.current), keyID)
     .then(response => {
        console.log('Llave traspasada con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        // Se resetean los valores del UseRef
        setTimeout(() => {
          window.location.reload(); // Hace un refresh a la página tras 1 segundo
        }, 1000);
        onSuccess('Llave traspasada con éxito.'); // Sale la pequeña notificación.
      })
     .catch(error => {
        console.error('Error al traspasar la llave:', error);
      });
  };

  const handleClose = () => {
    // Solo cierra el diálogo si showAlert es falso
    if (!showAlert) {
      onClose();
    }
  };

  // Constante para actualizar el valor user_id cada vez que lo cambian en el InputSelector
  const handleSelectorChange = (newValue) => {
    KeyRef.current["user_id"] = newValue;
  };

  // Mostrar el componente de alerta si showAlert es verdadero
  return (
    <>
      {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
          React.createElement('div', { className: 'dialog-content' },
            React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
            React.createElement('h2', null, 'Editar incidencia'),
            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('label', { className: 'dialog-title' }, 'Usuarios',),
              React.createElement(InputSelector, {name: 'Usuarios', data: userOptions, onChange: handleOnChange.bind(null, 'Usuario'), onBlur: null, id: `Usuarios`}),
              React.createElement('button', { className: 'button-group dialog-button', type:'submit' }, 'Enviar')
            )
          )
        )
      )}
    </>
  );
};

export default EditKey;