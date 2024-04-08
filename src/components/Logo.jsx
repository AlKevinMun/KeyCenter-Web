import React from "react";

function Logo(ruta) {
 return (
    React.createElement('div', { className: 'logo-container' },
      React.createElement('img', { className: 'img-container', src: ruta }, null),
    )
 );
}

export default Logo;
