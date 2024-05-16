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
//import CreateIncidence from "../components/CreateIncidence.jsx";
import { getKey } from "../service/Axios.jsx";

function MainPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [keys, setKeys] = useState([]);
  const [filterState, setFilterState] = useState('2');
  const [selectedKey, setSelectedKey] = useState(null);
  const [stateOptions, setStateOptions] = useState([
    { value: 'all', label: 'Todas' },
    { value: '0', label: 'Disponibles' },
    { value: '1', label: 'En uso' },

  ]);

  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };

  useEffect(() => {
    refreshKeys();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const refreshKeys = async () => {
    try {
      const response = await getKey();
      console.log(response.data);
      setKeys(response.data);
    } catch (error) {
      console.error("Error al actualizar las llaves:", error);
    }
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleElementClick = (key) => {
    setSelectedKey(key);
  };

  const filteredKeys = keys.filter(key => {
    if (filterState === 'all') return true; // Si el filtro está en 'all', muestra todas las llaves
    if (filterState === '0') return key.user_id === 0; // Si no hay filtro aplicado, no muestra ninguna llaves
    return key.user_id >1;
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
            SearchBar('Buscar Llaves'),
            InputSelector('Estados', stateOptions, null, handleStateChange, null, 'Estados'),
          ),
          React.createElement(TableList, { items: filteredKeys, refreshItems: refreshKeys }),
          AddButton("Añadir nueva llave", 'button-group',handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      //React.createElement(CreateIncidence, { isOpen: isDialogOpen, onClose: handleCloseDialog, keys: selectedKey  })
    )
  );
}

export default MainPage;
