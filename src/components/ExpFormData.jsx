import React from 'react';
import InputText from './InputText.jsx';
import InputSelector from './InputSelector.jsx';
import ChechBox from './CheckBox.jsx';

function ExpFormData(items) {
  console.log(items)
  return (
    React.createElement('div', { className: 'working-group' },
      InputText('Centro'),
      InputSelector('Profesión', items, 'Profesiones', null),
      InputSelector('Especialidad', items, 'ProfesionesObjects', null),
      InputSelector('Subespecialidad', items, null, null),
      InputText('Cargo'),
      ChechBox('Pertenece al Sis. Nac. de Salud Pública', 'check-page3'),
      ChechBox('Actualmente tengo este cargo', 'check-page3'),
      InputSelector('Mes de inicio', items, null, null),
      InputSelector('Año de inicio', items, null, null),
      InputSelector('Mes de fin', items, null, null),
      InputSelector('Año de fin', items, null, null),
      ChechBox('He ejercido como tutor/a', 'check-page3'),
      ChechBox('Experiencia en país en desarollo', 'check-page3')
    )
  );
}

export default ExpFormData;