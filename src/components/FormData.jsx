import React from "react";
import InputText from "./InputText.jsx";
import InputSelector from "./InputSelector.jsx";

function FormData(items, {onChange}) {
  console.log(items)
  console.log(onChange)
  return (
    React.createElement('div', { className: 'formation-group' },
      InputSelector('Tipo de formación', null, 'Tipo de formacion', null, items.handleChangeText),
      InputSelector('Especialidad', null, 'ProfesionesObjects', null, items.handleChangeText),
      InputText('Centro formativo', items.handleChangeText),
      InputSelector('Año de titulación', null, null, null, items.handleChangeText),
    )
  );
}

export default FormData;