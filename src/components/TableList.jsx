import React from "react";
import TableElement from "./TableElement.jsx"

function TableList() {
  return (
    React.createElement('div', { className: 'TableList-container' },
      React.createElement('ul', { className: 'containet-TableElements'},
        TableElement('Falta RAM PC 19 aula Turing', 'Descripción bien amplia del problema', '20/05/22', 'Finalizado'),
        TableElement('Falta RAM PC 10 aula Turing', 'Descripción bien amplia del problema', '10/05/22', 'En curso'),
      )
    )
  );
}

export default TableList;