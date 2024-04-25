import React, { useState, useEffect } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx"
import NavRoute from "../components/NavRoute.jsx"
import FolderTree from "../components/FolderTree.jsx"
import TitleForm from "../components/TitleForm.jsx"
import ServiceKey from "../components/ServiceKeys.jsx"
import SearchBar from "../components/SearchBar.jsx"
import InputSelector from "../components/InputSelector.jsx"
import TableList from "../components/TableList.jsx"

function MainPage() {
 return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
      NavRoute(),
       React.createElement('div', {className: 'content-containet'},
         React.createElement('div', {className: 'folders-container'},
           FolderTree(),
         ),
         React.createElement('div', {className: 'data-container'},
            TitleForm('Incidencias'),
            React.createElement('div', {className: 'Search-hooks'},
            SearchBar(),
            InputSelector(null,null,null,null,null, 'Estados') // Insertar la llamada de la api para obtener los estados.
            ),
           TableList(),
         ),
         React.createElement('div', {className: 'service-keys-container'},
           ServiceKey(),
         )
       )
    )
 );
}

export default MainPage;
