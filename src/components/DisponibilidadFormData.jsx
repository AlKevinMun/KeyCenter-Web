import React from "react";
import InputSelector from "./InputSelector.jsx";
import InputDate from "./InputDate.jsx";


function DisponibilidadFormData(items){
  return(
    React.createElement('div', {className: 'working-group'},
        InputSelector('Disponibilidad',items,'Duracion',null),
        InputDate('Periodo (Desde - Hasta)')
    )
  );
}
 
  export default DisponibilidadFormData;