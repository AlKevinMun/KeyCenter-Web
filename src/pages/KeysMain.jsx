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
import CreateKey from "../components/CreateKey.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import { useNavigate } from "react-router-dom";
import { getKey } from "../service/Axios.jsx";

function MainPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [filterState, setFilterState] = useState('2');
  const [selectedKey, setSelectedKey] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [stateOptions, setStateOptions] = useState([
    { value: 'all', label: 'Todas' },
    { value: '0', label: 'Disponibles' },
    { value: '1', label: 'En uso' },
  ]);

  const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda

  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };

  useEffect(() => {
    refreshKeys();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const refreshKeys = async () => {
    try {
      const response = await getKey();
      setKeys(response.data);
    } catch (error) {
      console.error("Error al actualizar las llaves:", error);
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

  const handleElementClick = (key) => {
    setSelectedKey(key);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Actualiza el estado de búsqueda
  };

  const filteredKeys = keys.filter(key => {
    if (filterState !== 'all') {
      if (filterState === '0' && key.user_id !== 1) return false;
      if (filterState === '1' && key.user_id <= 1) return false;
    }
    if (searchQuery && !key.room_name.toLowerCase().includes(searchQuery.toLowerCase())) return false; // Filtra por nombre de llave
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
          TitleForm('Llaves'),
          React.createElement('div', { className: 'Search-hooks' },
            React.createElement(SearchBar, { placeholder: 'Buscar Llaves', onSearch: handleSearch }), // Pasar las props necesarias a SearchBar
            React.createElement(InputSelector, {name: 'Estados', data: stateOptions, onChange: handleStateChange, onBlur: null, id: `Estados`}),
          ),
          React.createElement(TableList, { items: filteredKeys, refreshItems: refreshKeys }),
          AddButton("Añadir nueva llave", 'button-group',handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      successMessage && React.createElement(SuccessMessage, { message: successMessage, isVisible: true }),
      React.createElement(CreateKey, { isOpen: isDialogOpen, onClose: handleCloseDialog, keys: selectedKey, onSuccess: handleSuccess ,onRefresh: refreshKeys})
    )
  );
}

export default MainPage;
