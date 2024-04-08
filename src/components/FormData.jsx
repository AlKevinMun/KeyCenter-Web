import React from "react";
import InputText from "./InputText.jsx";
import InputSelector from "./InputSelector.jsx";

function FormData(items){
  console.log(items)
  return(
    React.createElement('div', {className: 'formation-group'},
        InputSelector('Tipo de formación',null,'Tipo de formacion',null),
        InputSelector('Especialidad',null,'ProfesionesObjects',null),
        InputText('Centro formativo'),
        InputSelector('Año de titulación',null,null,null),
    )
  );
}
 
  export default FormData;
