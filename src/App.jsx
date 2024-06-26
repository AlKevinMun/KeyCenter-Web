import React from "react";
import { Route, Routes } from "react-router-dom";
import KeyCenterMain from "./pages/KeyCenterMain.jsx"
import KeysMain from "./pages/KeysMain.jsx"
import ManualMain from "./pages/ManualMain.jsx"
import ManualUso from "./pages/ManualUso.jsx"
import ManualInstalació from "./pages/ManualInstalació.jsx"
import SignIn from "./pages/SignIn.jsx"
import Ayuda from "./pages/Ayuda.jsx"
import IncidenceMain from "./pages/IncidenceMain.jsx"
import ShowIncidence from "./pages/ShowIncidence.jsx"
import ShowKeys from "./pages/ShowKeys.jsx"
import ShowUser from "./pages/ShowUser.jsx"
import UsersMain from "./pages/UsersMain.jsx"
import Perfil from "./pages/Perfil.jsx"

  function App() {
    return React.createElement(Routes, null,
            React.createElement(Route, {path:"/", element: KeyCenterMain() }),
            React.createElement(Route, {path:"/Llaves", element: KeysMain() }),
            React.createElement(Route, {path:"/Incidencias", element: IncidenceMain()}),
            React.createElement(Route, {path:"/DetallesIncidencia/:incidenceId", element: <ShowIncidence /> }),
            React.createElement(Route, {path:"/DetallesLlaves/:keyId", element: <ShowKeys /> }),
            React.createElement(Route, {path:"/DetallesUsers/:userId", element: <ShowUser /> }),
            React.createElement(Route, {path:"/Manuales", element: ManualMain() }),
            React.createElement(Route, {path:"/Manuales/ManualUso", element: ManualUso() }),
            React.createElement(Route, {path:"/Manuales/ManualInstalació", element: ManualInstalació() }),
            React.createElement(Route, {path:"/SignIn", element: SignIn() }),
            React.createElement(Route, {path:"/Ayuda", element: Ayuda() }),
            React.createElement(Route, {path:"/Usuarios", element: UsersMain() }),
            React.createElement(Route, {path:"/Perfil", element: Perfil() }),
    );
  }
  
  export default App;