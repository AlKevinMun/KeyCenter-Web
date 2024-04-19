import React from "react";

function Logo(ruta, className) {
 return (
    React.createElement('div', { className: 'logo-container' },
      React.createElement('img', { className: className, src: ruta }, null),
    )
 );
}

export default Logo;
