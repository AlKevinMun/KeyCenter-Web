import React, { useState, useEffect } from "react";
import TableElement from "./TableElement.jsx";

function TableList({ items, refreshItems }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickElement = (item) => {
    const itemId = item.id;
    if(item.topic){window.location.href = `/DetallesIncidencia/${itemId}`;} // Ajusta la URL según sea necesario
    else if(item.room_name){window.location.href = `/DetallesLlaves/${itemId}`;} // Ajusta la URL según sea necesario
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (refreshItems) {
        refreshItems();
      }
    }, 15000); // Llama a refreshItems cada 30 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [refreshItems]);

function checkKeyUsage(userId) {
  // Simulación de una llamada a la API o consulta a la base de datos
  // Devuelve un string indicando si la llave está en uso o no
  // En un escenario real, esta función interactuaría con tu backend o base de datos
  const usageStatus = userId > 1? "En uso" : "Disponible";
  return usageStatus;
}


  return (
    React.createElement('div', { className: 'TableList-container' },
      React.createElement('ul', { className: 'container-TableElements' },
        items.map((item, index) =>
          React.createElement(
            TableElement,
            { key: index, name: item.topic || item.id +" - "+item.room_name, description: item.description || " ", date: item.send_date || item.hora, status: item.state === undefined? checkKeyUsage(item.user_id) : item.state, onClick: () => handleClickElement(item) }
          )
        )
      ),
    )
  );
}

export default TableList;
