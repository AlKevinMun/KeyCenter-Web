import React, { useState, useEffect } from "react";
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
  const [filterState, setFilterState] = useState('all');
  const [selectedIncidence, setSelectedIncidence] = useState(null);
  const [stateOptions, setStateOptions] = useState([
    { value: 'all', label: 'Todas' },
    { value: '0', label: 'Abierto' },
    { value: '1', label: 'En Proceso' },
    { value: '2', label: 'Cerrado' }
  ]);

  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };

  useEffect(() => {
    refreshIncidences();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const refreshIncidences = async () => {
    try {
      const response = await getIncidence();
      console.log(response.data);
      setIncidences(response.data);
    } catch (error) {
      console.error("Error al actualizar las incidencias:", error);
    }
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleElementClick = (incidence) => {
    setSelectedIncidence(incidence);
  };

  const filteredIncidences = incidences.filter(incidence => {
    if (filterState === 'all') return true; // Si el filtro está en 'all', muestra todas las incidencias
    if (filterState === null) return false; // Si no hay filtro aplicado, no muestra ninguna incidencia
    return incidence.state === parseInt(filterState); // Compara el estado de la incidencia con el filtro
  });


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
            InputSelector('Estados', stateOptions, null, handleStateChange, null, 'Estados'),
          ),
          React.createElement(TableList, { items: filteredIncidences, refreshItems: refreshIncidences }),
          AddButton("Añadir nueva incidencia", 'button-group',handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      React.createElement(CreateIncidence, { isOpen: isDialogOpen, onClose: handleCloseDialog, incidence: selectedIncidence  })
    )
  );
}

export default MainPage;
