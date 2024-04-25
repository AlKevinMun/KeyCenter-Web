import React, { useState, useEffect } from "react";

function InputSelector(name, data, plural, onChange, onBlur, id) {
    if(id === null){
  //Si se diera el caso de que la información dada por la api fuera NULL, se mostraria los datos por defecto.
  if (data === null) {
    return (
      React.createElement('div', { className: 'input-group' },
        React.createElement('label', { className: 'input-label' }, name,),
        React.createElement('select', { className: 'input' },
          React.createElement('option', { value: 'option1' }, 'option1'),
          React.createElement('option', { value: 'option2' }, 'option2'),
          React.createElement('option', { value: 'option3' }, 'option3')
        )
      )
    );
  }
  else {
    let options = [];
    if (plural === null) {
      if (name === 'Pais de residencia') {
        options = data.paises.map((item, index) => {
          return React.createElement('option', { key: item.id, value: item.id }, item.name);
        });
      } else if (name === 'Provincia') {
        options = data.provincias.map((item, index) => {
          return React.createElement('option', { key: item.paisId, value: item.paisId }, item.nombre);
        });
      } else if (name === 'Año de titulación' || name === 'Año de inicio') {
        options = [];
        for (let year = 2024; year >= 1924; year--) {
           options.push(React.createElement('option', { key: year, value: year }, year));
        }
      } else if (name === 'Año de fin') {
        options = [];
        for (let year = 2024; year <= 2124; year++) {
           options.push(React.createElement('option', { key: year, value: year }, year));
        }
      } else if (name === 'Mes de inicio' || name === 'Mes de fin' ) {
        options = [];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        meses.forEach((mes, index) => {
          options.push(React.createElement('option', { key: index, value: mes }, mes));
       });
      }
    }
    else if (data.perfilprofesional === undefined) {
      if (data.items.perfilprofesional[plural].listTypeEntries !== undefined) {
        console.log(data.items.perfilprofesional[plural].listTypeEntries)
        options = data.items.perfilprofesional[plural].listTypeEntries.map((item, index) => {
          const nameI18n = item.nameI18n["es-ES"] || item.name;
          return React.createElement('option', { key: item.id, value: item.id }, nameI18n);
        });
      }
      else {
        console.log(data.items.perfilprofesional[plural]);
        data.items.perfilprofesional[plural].forEach(item => {
          item.especialidades.map((especialidad, index) => {
            let idEspecialidad = especialidad.id
            let nombreEspecialidad = especialidad.name.name
            options.push(React.createElement('option', { key: idEspecialidad, value: idEspecialidad }, nombreEspecialidad))
          })
        });
      }
    }

    else {
      console.log(data.perfilprofesional[plural].listTypeEntries);
      options = data.perfilprofesional[plural].listTypeEntries.map((item, index) => {

        const nameI18n = item.nameI18n["es-ES"] || item.name;
        return React.createElement('option', { key: item.id, value: item.id }, nameI18n);
      });
    }

    return (
      React.createElement('div', { className: 'input-group' },
        React.createElement('label', { className: 'input-label' }, name),
        React.createElement('select', { className: 'input', name: name.toLowerCase() ,onChange: onChange, onBlur: onBlur}, ...options)
      )
    );
  }
}
else{
    return (
      React.createElement('div', { className: 'input-group2', id: id },
        React.createElement('label', { className: 'input-label' }, name,),
        React.createElement('select', { className: 'input' },
          React.createElement('option', { value: 'option1' }, 'option1'),
          React.createElement('option', { value: 'option2' }, 'option2'),
          React.createElement('option', { value: 'option3' }, 'option3')
        )
      )
    );
    }
}
export default InputSelector;

