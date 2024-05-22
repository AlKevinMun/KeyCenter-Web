import React from 'react';
import { Link } from 'react-router-dom';
/*
* El siguiente componente se trata del elemento que se muestra en FolderTree.
* Para crearlo requieres darle el path al que quieres que rediriga cuando le das click, el texto que aparecera en el elemento
* la ruta a la imagen del elemento, y la clase para el css en el caso de no querer usar la normal.
*/
const FolderElement = ({ path, name, icon, className }) => {
  return React.createElement(
    'li',
    { className: className || "folder-element" }, // Utiliza el className proporcionado o el predeterminado
    React.createElement(
      Link,
      { to: path, className: "folder-link" },
      React.createElement('img', { className: 'folder-icon', src: icon, alt: name }),
      React.createElement('p', { className: 'folder-text' }, name)
    )
  );
};

export default FolderElement;
