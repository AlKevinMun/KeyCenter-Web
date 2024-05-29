import React, { useState, useEffect } from "react";
import TableElement from "./TableElement.jsx";
/*
* El siguiente componente se trata de una lista con todos los elementos que haya de algo. Incidencias, Llaves, Usuarios...
* Para poder crearlo es necesario pasarle el array de items que se van a mostrar, y un método para actualizarla la lista.
*/
function TableList({ items, refreshItems }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Almacena si el dialogo esta abierto o cerrado
  const [selectedItem, setSelectedItem] = useState(null); // Almacena el item que se a seleccionado.

  // Función que se llama cuando se clicka en el elemento en concreto.
  const handleClickElement = (item) => {
    const itemId = item.id;
    if(item.topic){window.location.href = `/DetallesIncidencia/${itemId}`;} // En el caso de que sea una Incidencia.
    else if(item.room_name){window.location.href = `/DetallesLlaves/${itemId}`;} // En el caso de que sea una Llave.
    else if(item.rol){window.location.href = `/DetallesUsers/${itemId}`;} // En el caso de que sea una Users.
    setSelectedItem(item);
    setIsDialogOpen(true);
  };
  // Funcion para alterar si esta o no abierto.
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  // El useRef solamente se activa una vez se entre en la pagina, y estara siempre existiendo/activado (en este caso).
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (refreshItems) {
        refreshItems();
      }
    }, 20000); // Llama a refreshItems cada 20 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [refreshItems]); // Solo se puede utilizar si se le pasa el método para actualizar.

  // Función para determinar si la llave esta o no en uso por alguien dependiendo la id de quien tenga la llave en ese momento.
  function checkKeyUsage(userId) {
    const usageStatus = userId > 1? "En uso" : "Disponible";
    return usageStatus;
  }


  return (
    React.createElement('div', { className: 'TableList-container' },
      React.createElement('ul', { className: 'container-TableElements' },
        items.map((item, index) =>
                  React.createElement(TableElement,{
                    key: index,
                    name: item.topic || item.username || item.id +" - "+item.room_name,
                    description: item.description || item.email || " ",
                    date: item.rol === undefined? item.send_date || item.hora : " ",
                    status: item.rol === undefined? item.state === undefined? checkKeyUsage(item.user_id) : item.state : item.rol,
                    onClick: () => handleClickElement(item)
                  })
                )
      ),
    )
  );
}

export default TableList;
