import React from "react";
import InputSelector from "./InputSelector.jsx";
import InputDate from "./InputDate.jsx";


function DisponibilidadFormData(){
  return(
    React.createElement('div', {className: 'working-group'},
        InputSelector('Disponibilidad',null,null,null),
        InputDate('Periodo (Desde - Hasta)')
    )
  );
}
 
  export default DisponibilidadFormData;