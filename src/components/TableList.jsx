import React, { useState, useEffect } from "react";
import TableElement from "./TableElement.jsx";

function TableList({ incidences, refreshIncidences }) {
  useEffect(() => {
    if (refreshIncidences) {
      refreshIncidences();
    }
  }, [refreshIncidences]);

  return React.createElement('div', { className: 'TableList-container' },
    React.createElement('ul', { className: 'containet-TableElements' },
      incidences.map((incidence, index) =>
        React.createElement(TableElement, { key: index, name: incidence.topic, description: incidence.description, date: incidence.send_date, status: incidence.state }))
    )
  );
}

export default TableList;
