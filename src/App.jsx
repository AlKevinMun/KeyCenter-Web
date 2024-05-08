import React, {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
//import MainContainer from "./components/MainContainer.jsx"
import KeyCenterMain from "./pages/KeyCenterMain.jsx"
import KeysMain from "./pages/KeysMain.jsx"
import ManualMain from "./pages/ManualMain.jsx"
import ManualUso from "./pages/ManualUso.jsx"
import ManualUsuario from "./pages/ManualUsuario.jsx"
import ManualAdministracion from "./pages/ManualAdministracion.jsx"
import SignIn from "./pages/SignIn.jsx"
import SignUp from "./pages/SignUp.jsx"
import Ayuda from "./pages/Ayuda.jsx"
import IncidenceMain from "./pages/IncidenceMain.jsx"

  function App() {
    return React.createElement(Routes, null,
            React.createElement(Route, {path:"/", element: KeyCenterMain() }),
            React.createElement(Route, {path:"/Llaves", element: KeysMain() }),
            React.createElement(Route, {path:"/Incidencias", element: IncidenceMain()}),
            React.createElement(Route, {path:"/Manuales", element: ManualMain() }),
            React.createElement(Route, {path:"/Manuales/ManualUso", element: ManualUso() }),
            React.createElement(Route, {path:"/Manuales/ManualUsuario", element: ManualUsuario() }),
            React.createElement(Route, {path:"/Manuales/ManualAdministracion", element: ManualAdministracion() }),
            React.createElement(Route, {path:"/SignUp", element: SignUp() }),
            React.createElement(Route, {path:"/SignIn", element: SignIn() }),
            React.createElement(Route, {path:"/Ayuda", element: Ayuda() }),
    );
  }
  
  export default App;