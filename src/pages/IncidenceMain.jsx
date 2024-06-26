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
import SuccessMessage from "../components/SuccessMessage.jsx";
import { getIncidence } from "../service/Axios.jsx";

function MainPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [incidences, setIncidences] = useState([]);
  const [filterState, setFilterState] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
  const [selectedIncidence, setSelectedIncidence] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [stateOptions, setStateOptions] = useState([
    { value: 'all', label: 'Todas' },
    { value: '0', label: 'Enviado' },
    { value: '1', label: 'En curso' },
    { value: '-1', label: 'Finalizado' }
  ]);

  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };

  useEffect(() => {
    refreshIncidences();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const refreshIncidences = async () => {
    try {
      const response = await getIncidence();
      setIncidences(response.data);
    } catch (error) {
      console.error("Error al actualizar las incidencias:", error);
    }
  };

  // Función para manejar el mensaje de éxito
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000); // Oculta el mensaje después de 5 segundos
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleElementClick = (incidence) => {
    setSelectedIncidence(incidence);
  };
  const handleSearch = (query) => {
      setSearchQuery(query); // Actualiza el estado de búsqueda
  };

  const filteredIncidences = incidences.filter(incidence => {
    // Filtra por estado si es necesario
    if (filterState !== 'all') { // Si el filtro está en 'all', muestra todas las incidencias
      if (incidence.state !== parseInt(filterState)) return false;  // Compara el estado de la incidencia con el filtro
    }
    // Filtra por término de búsqueda
    if (searchQuery && !incidence.topic.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
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
            React.createElement(SearchBar, { placeholder: 'Buscar incidencias', onSearch: handleSearch }), // Pasar las props necesarias a SearchBar
            React.createElement(InputSelector, {name: 'Estados', data: stateOptions, onChange: handleStateChange, onBlur: null, id: `Estados`}),
          ),
          React.createElement(TableList, { items: filteredIncidences, refreshItems: refreshIncidences }),
          AddButton("Añadir nueva incidencia", 'button-group',handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      successMessage && React.createElement(SuccessMessage, { message: successMessage, isVisible: true }),
      React.createElement(CreateIncidence, { isOpen: isDialogOpen, onClose: handleCloseDialog, incidence: selectedIncidence,onSuccess: handleSuccess ,onRefresh: refreshIncidences })
    )
  );
}

export default MainPage;
