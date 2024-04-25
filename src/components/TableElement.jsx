import React from "react";

function TableElement(name, description, date, status) {
  return (
    React.createElement('li', { className: 'TableElement-li'},
      React.createElement('div', { className: 'TableElement-container' },
        React.createElement('p', { className: 'TableElement-name'}, name),
        React.createElement('p', { className: 'TableElement-description'}, description),
        React.createElement('p', { className: 'TableElement-date'}, date),
        React.createElement('p', { className: 'TableElement-status'}, status),
      )
    )
  );
}

export default TableElement;