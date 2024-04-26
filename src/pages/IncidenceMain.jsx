import React, { useState } from "react";
import Logo from "../components/Logo.jsx";
import NavMenu from "../components/NavMenu.jsx";
import NavRoute from "../components/NavRoute.jsx";
import FolderTree from "../components/FolderTree.jsx";
import TitleForm from "../components/TitleForm.jsx";
import ServiceKey from "../components/ServiceKeys.jsx";
import SearchBar from "../components/SearchBar.jsx";
import InputSelector from "../components/InputSelector.jsx";
import TableList from "../components/TableList.jsx";
import AddButton from "../components/AddButton.jsx";
import CreateIncidence from "../components/CreateIncidence.jsx";
import { getIncidence } from "../service/Axios.jsx";

function MainPage() {
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [incidences, setIncidences] = useState([]);

 const handleOpenDialog = () => {setIsDialogOpen(true);};
 const handleCloseDialog = () => {setIsDialogOpen(false);};

 const refreshIncidences = async () => {
    try {
      const response = await getIncidence();
      setIncidences(response.data);
    } catch (error) {
      console.error("Error al actualizar las incidencias:", error);
    }
 };

 return (
    React.createElement('div', { className: 'main-container' },
      Logo('resources/logotipoWeb.png'),
      NavMenu(),
      NavRoute(),
      React.createElement('div', { className: 'content-containet' },
        React.createElement('div', { className: 'folders-container' },
          FolderTree(),
        ),
        React.createElement('div', { className: 'data-container' },
          TitleForm('Incidencias'),
          React.createElement('div', { className: 'Search-hooks' },
            SearchBar(),
            InputSelector(null, null, null, null, null, 'Estados'),
          ),
          React.createElement(TableList, { incidences, refreshIncidences }),
          AddButton("Añadir nueva incidencia", handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      React.createElement(CreateIncidence, { isOpen: isDialogOpen, onClose: handleCloseDialog })
    )
 );
}

export default MainPage;