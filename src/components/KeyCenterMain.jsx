import React, { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import NavMenu from "./NavMenu.jsx"

function MainPage() {
 return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
    )
 );
}

export default MainPage;
