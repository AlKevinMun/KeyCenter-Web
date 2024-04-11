import React from 'react';
import { Link } from 'react-router-dom';

const FolderElement = ({ path, name, icon }) => {
 return React.createElement(
    'li',
    { className: "folder-element" },
    React.createElement(
      Link,
      { to: path, className: "folder-link" },
      React.createElement('img', { className: 'folder-icon', src: icon, alt: name }),
      React.createElement('p', { className: 'folder-text' }, name)
    )
 );
};

export default FolderElement;
