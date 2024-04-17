import React from "react";
import { Link } from "react-router-dom";

function NavMenu() {
 return (
    React.createElement('nav', { className: "nav-container" },
      React.createElement('div', { className: "menu-container" },
        React.createElement('ul', { className: "menu-table" },
          React.createElement('li', { className: "menu-element" },
            React.createElement(Link, { to: "/", className: "menu-link" },
              React.createElement('strong', null, 'Inici')
            )
          ),
          React.createElement('li', { className: "menu-element" },
            React.createElement(Link, { to: "/Llaves", className: "menu-link" },
              React.createElement('strong', null, 'Llaves')
            )
          ),
          React.createElement('li', { className: "menu-element" },
            React.createElement(Link, { to: "/Incidencias", className: "menu-link" },
              React.createElement('strong', null, 'Incidencias')
            )
          ),
          React.createElement('li', { className: "menu-element" },
            React.createElement(Link, { to: "/Manuales", className: "menu-link" },
              React.createElement('strong', null, 'Manuales')
            )
          ),
          React.createElement('li', { className: "menu-element menu-login" },
            React.createElement(Link, { to: "/SignIn", className: "menu-link" },
              React.createElement('strong', null, 'Log In')
            )
          ),
        )
      )
    )
 );
}

export default NavMenu;
