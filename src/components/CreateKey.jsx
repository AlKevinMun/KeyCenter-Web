import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx"
import { postKey } from "../service/Axios.jsx";
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
const CreateKey = ({ isOpen, onClose, onRefresh, onSuccess}) => {
  // Esta constante se trata del documento con los datos necesarios para la creación de la llave.
  const KeyRef = useRef({
    "id": '',
    "room_name": '',
  });
  const [showAlert, setShowAlert] = useState(false); // useState para controlar la visibilidad del componente de alerta.
  const [msgError, setMsgError] = useState(''); // useState para almacenar el mensaje de error.
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

    console.log(newValue);
    console.log(newName);
    console.log(KeyRef.current[newName] = newValue);
    KeyRef.current[newName] = newValue;
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


    // Verificar si los campos están vacíos
    if (!KeyRef.current.room_name.trim() ||!KeyRef.current.id.trim()) {
      if(!KeyRef.current.room_name){setMsgError('No se puede crear la llave sin establecer a que aula pertenece la llave')}
      else if(!KeyRef.current.id){setMsgError('No se puede crear la llave sin su identificador.')}
      if(!KeyRef.current.room_name && !KeyRef.current.description){setMsgError('No se puede crear la llave con los campos vacios.')}
      setShowAlert(true); // Muestra el componente de alerta si algún campo está vacío
      return; // Evita continuar con la llamada a postIncidence
    }

    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    postKey(JSON.stringify(KeyRef.current))
     .then(response => {
        console.log('Llave creada con ID:', response.data.id);
        onRefresh(); // Actualiza las incidencias para mostrar la nueva creada
        // Se resetean los valores del UseRef
        KeyRef.current.id = '';
        KeyRef.current.room_name = '';
        onSuccess('Llave creada con éxito.'); // Sale la pequeña notificación.
      })
      .catch(error => {
        console.error('Error al crear la llave:', error);
      });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {showAlert && <Alert msgError={msgError} isOpen={true} onClose={() => setShowAlert(false)} />}
      {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
          React.createElement('div', { className: 'dialog-content' },
            React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
            React.createElement('h2', null, 'Crear Nueva Llave'),
            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('label', { className: 'dialog-title' }, 'Identificador',),
              React.createElement('input', {type: 'number', className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Identificador') }),
              React.createElement('br'),
              React.createElement('label', { className: 'dialog-title' }, 'Nombre del aula',),
              React.createElement('input', { className: 'dialog-description', onBlur: handleOnChange.bind(null, 'Nombre del aula') }),
              React.createElement('br'),
              React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
            )
          )
        )
      )}
    </>
  );
};

export default CreateKey;
