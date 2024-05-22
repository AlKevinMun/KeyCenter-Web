import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx";
import { postIncidence } from "../service/Axios.jsx";
import Alert from './Alert';
/*
* El siguiente componente se trata de una ventana emergente para crear específicamente una incidencia. Se intento crear
* Como una ventana emergente global, pero no era posible por la diferencia de campos entre todos los objetos.
* Para invocar este componente se requiere pasarle un booleano que indica si esta, o no abierto/visible.
* Una  una función para cuando se pulse el botón.
* El componente esta pensado para que la función que se le mande modifique el booleano haciendo asi que se cierre la ventana.
* Una función que actualiza todas las incidencias una vez creada la nueva, y una llamada a una función para establecer
* un comportamiento si funciona todo con exito.
*/
const CreateIncidence = ({ isOpen, onClose, onRefresh, onSuccess }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación de la incidencia.
  const IncidenceRef = useRef({
    "topic": '',
    "description": '',
    "user_id": 1
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

    if (name === 'Asunto') { newName = "topic"; }
    else if (name === 'Descripcion') { newName = "description"; }

    IncidenceRef.current[newName] = newValue; // Busca dentro de IncidenceRef el valor del newName y le da el valor escrito.
  }
  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado la incidencia con exito. También se manejan los errores en dicha
  * función.
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!IncidenceRef.current.topic.trim() ||!IncidenceRef.current.description.trim()) {
      if(!IncidenceRef.current.topic){setMsgError('No se puede enviar la incidencia sin un asunto.')}
      else if(!IncidenceRef.current.description){setMsgError('No se puede enviar la incidencia sin una descripción.')}
      if(!IncidenceRef.current.topic && !IncidenceRef.current.description){setMsgError('No se puede enviar la incidencia con los campos vacios.')}
      setShowAlert(true); // Muestra el componente de alerta si algún campo está vacío
      return; // Evita continuar con la llamada a postIncidence
    }

    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    postIncidence(JSON.stringify(IncidenceRef.current))
     .then(response => {
        console.log('Incidencia creada con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        onRefresh(); // Actualiza las incidencias para mostrar la nueva creada
        // Se resetean los valores del UseRef
        IncidenceRef.current.topic = '';
        IncidenceRef.current.description = '';
        onSuccess('Incidencia creada con éxito.'); // Sale la pequeña notificación.
      })
     .catch(error => {
        console.error('Error al crear la incidencia:', error);
      });
  };

  const handleClose = () => {
    // Solo cierra el diálogo si showAlert es falso
    if (!showAlert) {
      onClose();
    }
  };

  // Mostrar el componente de alerta si showAlert es verdadero
  return (
    <>
      {showAlert && <Alert msgError={msgError} isOpen={true} onClose={() => setShowAlert(false)} />}
      {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
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
        )
      )}
    </>
  );
};

export default CreateIncidence;
