import React from "react";

function NavRoute(route) {
 return (
    React.createElement('div', { className: 'route-container' },
      React.createElement('p', { className: 'route-element'}, 'test'),
      //Map en el que se cree un elemento P por cada rango Jerárquico de route.
    )
 );
}

export default NavRoute;
