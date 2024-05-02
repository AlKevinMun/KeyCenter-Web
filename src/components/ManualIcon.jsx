import React from "react";

function ManualIcon(ruta, name, className) {
 return (
    React.createElement('div', { className: 'manual-container' },
      React.createElement('img', { className: null, src: ruta }, null),
      React.createElement('p', {className: className}, name))
 );
}

export default ManualIcon;
