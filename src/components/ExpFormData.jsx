import React from "react";
import InputText from "./InputText.jsx";
import InputSelector from "./InputSelector.jsx";
import ChechBox from "./CheckBox.jsx";

function ExpFormData(){
  return(
    React.createElement('div', {className: 'working-group'},
        InputText("Centro"),
        InputSelector("Profesión",null,null,null),
        InputSelector("Especialidad",null,null,null),
        InputSelector("Subespecialidad",null,null,null),
        InputText("Cargo"),
        ChechBox("Pertenece al Sis. Nac. de Salud Pública"),
        ChechBox("Actualmente tengo este cargo"),
        InputSelector("Mes de inicio",null,null,null),
        InputSelector("Año de inicio",null,null,null),
        InputSelector("Mes de fin",null,null,null),
        InputSelector("Año de fin",null,null,null),
        ChechBox("He ejercido como tutor/a"),
        ChechBox("Experiencia en país en desarollo")
    )
  );
}
 
  export default ExpFormData;