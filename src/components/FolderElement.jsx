import React from 'react';
import { Link } from 'react-router-dom';

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
