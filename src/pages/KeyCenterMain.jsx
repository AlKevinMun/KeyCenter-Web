import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";

function MainPage() {
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (firstLoad || ['/'].includes(location.pathname) || ['/Manuales'].includes(location.pathname) || ['/Manuales/ManualInstalació'].includes(location.pathname) || ['/Manuales/ManualUso'].includes(location.pathname) || ['/SignIn'].includes(location.pathname) || ['/Ayuda'].includes(location.pathname)) {
      setFirstLoad(false);
      return;
    }

    const isLoggedIn = sessionStorage.getItem('token')!== null;
    if (!isLoggedIn) {
      navigate("/SignIn");
    }
  }, [location]);

  return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png', 'img-container'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', { className: 'content-containet' },
        React.createElement('div', { className: 'folders-container' },
          FolderTree(),
        ),
        React.createElement('div', { className: 'data-container' },
          TitleForm('KeyCenter'),
          React.createElement('div', { className: 'info-container' },
            React.createElement('p', { className: 'slogan' }, 'Inserta el lema aquí')),
          Logo('resources/logo.png', 'logoImg'),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      )
    )
  );
}

export default MainPage;
