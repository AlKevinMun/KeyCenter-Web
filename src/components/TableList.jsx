import React, { useState, useEffect } from "react";
import TableElement from "./TableElement.jsx";
import ShowIncidence from "../pages/ShowIncidence.jsx"; // Asegúrate de importar ShowIncidence

function TableList({ incidences, refreshIncidences }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIncidence, setSelectedIncidence] = useState(null);

  const handleClickElement = (incidence) => {
    const incidenceId = incidence.id; // Asume que cada incidencia tiene un campo 'id'
    window.location.href = `/Incidencias/DetallesIncidencia/${incidenceId}`;
    setSelectedIncidence(incidence);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (refreshIncidences) {
      refreshIncidences();
    }
  }, [refreshIncidences]);

  return (
    React.createElement('div', { className: 'TableList-container' },
      React.createElement('ul', { className: 'containet-TableElements' },
        incidences.map((incidence, index) =>
          React.createElement(TableElement, { key: index, name: incidence.topic, description: incidence.description, date: incidence.send_date, status: incidence.state, onClick: () => handleClickElement(incidence) })
        )
      )
    )
  );
}

export default TableList;
