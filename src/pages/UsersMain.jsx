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
import CreateUser from "../components/CreateUser.jsx";
import { getUser } from "../service/Axios.jsx";

function MainPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filterState, setFilterState] = useState('2');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenDialog = () => { setIsDialogOpen(true); };
  const handleCloseDialog = () => { setIsDialogOpen(false); };

  useEffect(() => {
    refreshUsers();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  const refreshUsers = async () => {
    try {
      const response = await getUser();
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error al actualizar los usuarios:", error);
    }
  };

  const handleStateChange = (event) => {
    setFilterState(event.target.value);
  };

  const handleElementClick = (user) => {
    setSelectedUser(user);
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
          TitleForm('Usuarios'),
          React.createElement('div', { className: 'Search-hooks' },
            SearchBar('Buscar usuarios'),
          ),
          React.createElement(TableList, { items: users, refreshItems: refreshUsers }),
          AddButton("Añadir nuevo usuario", 'button-group',handleOpenDialog),
        ),
        React.createElement('div', { className: 'service-keys-container' },
          ServiceKey(),
        )
      ),
      React.createElement(CreateUser, { isOpen: isDialogOpen, onClose: handleCloseDialog })
    )
  );
}

export default MainPage;
