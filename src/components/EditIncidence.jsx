import React, { useState, useRef } from 'react';
import InputText from "./InputText.jsx";
import InputSelector from "./inputSelector.jsx"
import { postIncidence } from "../service/Axios.jsx";
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
const EditIncidence = ({ isOpen, onClose, onRefresh, onSuccess, incidence }) => {
  // Esta constante se trata del documento con los datos necesarios para la creación de la incidencia.
  const currentUserRole = sessionStorage.getItem('loginUser')? JSON.parse(sessionStorage.getItem('loginUser')).id : '1';
  const IncidenceRef = useRef({
    "topic": '',
    "description": '',
    "user_id": currentUserRole,
    "state":''
  });
  const [showAlert, setShowAlert] = useState(false); // useState para controlar la visibilidad del componente de alerta.
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
    else if (name === 'Estado') { newName = "state"; }

    IncidenceRef.current[newName] = newValue; // Busca dentro de IncidenceRef el valor del newName y le da el valor escrito.
  }
  /*
  * Esta constante actua como función. Se lanza una vez esten todos los datos bien formados, y si no da ningun error sale
  * una pequeña notificación indicando que se a creado la incidencia con exito. También se manejan los errores en dicha
  * función.
  */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Utiliza la función del axios para mandar la incidencia a la base de  datos.
    PutIncidence(JSON.stringify(IncidenceRef.current), incidence.id)
     .then(response => {
        console.log('Incidencia creada con ID:', response.data.id);
        onClose(); // Cierra el diálogo después de éxito
        onRefresh(); // Actualiza las incidencias para mostrar la nueva creada
        // Se resetean los valores del UseRef
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
      {!isOpen? null : (
        React.createElement('div', { className: 'dialog-overlay' },
          React.createElement('div', { className: 'dialog-content' },
            React.createElement('button', { className: 'close-button', onClick: handleClose }, 'X'),
            React.createElement('h2', null, 'Editar incidencia'),
            React.createElement('form', { onSubmit: handleSubmit },
              React.createElement('label', { className: 'dialog-title' }, 'Estado',),
              InputSelector('Estados', null, null, null, null, 'Estados')
              React.createElement('button', { className: 'button-group dialog-button', type: 'submit' }, 'Enviar')
            )
          )
        )
      )}
    </>
  );
};

export default EditIncidence;