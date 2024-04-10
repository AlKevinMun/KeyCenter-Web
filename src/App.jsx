import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import MainContainer from "./components/MainContainer.jsx"
import KeyCenterMain from "./pages/KeyCenterMain.jsx"
import KeysMain from "./pages/KeysMain.jsx"

// Componente para redirigir a Google
function RedirectToPage(ruta) {
 useEffect(() => {
    window.location.href = ruta;
 }, []);

 return null; // No se renderiza nada, solo se realiza la redirección
}

  function App() {
    return React.createElement(Routes, null,
            React.createElement(Route, {path:"/", element: KeyCenterMain() }),
            React.createElement(Route, {path:"/Llaves", element: KeysMain() }),
            React.createElement(Route, {path:"/Incidencias", element: React.createElement('p', null, 'Work in progress')}),
            React.createElement(Route, {path:"/Manuales", element: React.createElement('p', null, 'Work in progress')}),
    );
  }
  
  export default App;