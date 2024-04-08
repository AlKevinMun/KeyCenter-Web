import React, { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import NavMenu from "./NavMenu.jsx"
import NavRoute from "./NavRoute.jsx"

function MainPage() {
 return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
      NavRoute('Algún metodo para identificar el rango jerárquico actual de la pagina (UseState)')
    )
 );
}

export default MainPage;
