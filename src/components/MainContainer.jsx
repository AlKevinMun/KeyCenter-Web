import React, { useState, useEffect, useRef } from "react";
import TitleForm from "./TitleForm.jsx";
import InputText from "./InputText.jsx";
import InputDate from "./InputDate.jsx";
import InputSelector from "./InputSelector.jsx";
import FormData from "./FormData.jsx";
import TextArea from "./TextArea.jsx";
import AddButton from "./AddButton.jsx";
import ExpFormData from "./ExpFormData.jsx";
import ChechBox from "./CheckBox.jsx";
import DisponibilidadFormData from "./DisponibilidadFormData.jsx";
import PaisButton from "./PaisButton.jsx";

function FooterForm() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const allFormDataRef = useRef({
    "nombre": "",
    "apellidos": "",
    "fechaNacimiento": "",
    "email": "",
    "telefonos": [
      {
        "numero": ""
      }
    ],
    "direcciones": [
      {
        "calle": "",
        "pais": 0,
        "region": 0,
        "localidad": "",
        "cp": ""
      }
    ],
    "paisesPref": [],
    "perfilProfesional": {
      "perfilProfesionalExperiencia": [
        {
          "funcionesDeTutor": false,
          "fechaInicio": 1483225200000,
          "fechaFin": 1640991600000,
          "notas": "",
          "paisCooperacion": -1,
          "experienciaEspecialidad": [
            {
              "id": 35817
            }
          ],
          "cargo": "",
          "sectorPublico": true,
          "centro": "",
          "profesion": {
            "id": 48900
          }
        }
      ],
      "perfilProfesionalFormacion": [
        {
          "tipo": {
            "key": ""
          },
          "formacionEspecialidad": [
            {
              "id": 0
            }
          ],
          "nombre": "nombre",
          "notas": "",
          "fechaFin": 0,
          "centroFormativo": ""
        }
      ],
      "perfilProfesionalDisponibilidad": [
        {
          "fechaInicio": 1072915200000,
          "fechaFin": 1104537600000,
          "duracion": {
            "key": ""
          }
        },
        {
          "fechaInicio": 1134345600000,
          "fechaFin": 1260576000000,
          "duracion": {
            "key": ""
          }
        }
      ],
      "perfilProfesionalIdioma": [
        {
          "idioma": {
            "key": ""
          },
          "nivel": {
            "key": ""
          }
        }
      ],
      "genero": {
        "key": ""
      },
      "nacionalidad": {
        "key": ""
      }
    }
  });

  const handleDataFetched = (fetchedData) => {
    setItems(fetchedData);
    sessionStorage.setItem("apiData", JSON.stringify(fetchedData));
    setIsLoading(false);
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("apiData");
    if (storedData) {
      setItems(JSON.parse(storedData));
      setIsLoading(false);
    } else {
      const fetchData = async () => {
        try {
          let response = await fetch('http://localhost:8080/o/fcsai/perfilprofesional/listas', {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa('kevin.munozgil@plexus.es' + ":" + 'test1')
            }
          });
          const perfilprofesional = await response.json();
          console.log(perfilprofesional);
          let response2 = await fetch('http://localhost:8080/o/fcsai/country/country-list', {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa('kevin.munozgil@plexus.es' + ":" + 'test1')
            }
          });
          const paises = await response2.json();
          console.log(paises);
          setSelectedCountryId(20338);
          const response3 = await fetch(`http://localhost:8080/o/fcsai/country/regions-by-countryId/${selectedCountryId}`, {
            method: "GET",
            headers: {
              Authorization: "Basic " + btoa('kevin.munozgil@plexus.es' + ":" + 'test1')
            }
          });
          const provincias = await response3.json();
          console.log(provincias);
          const combinedData = {
            perfilprofesional,
            paises,
            provincias
          };
          sessionStorage.setItem("apiData", JSON.stringify(combinedData));
          handleDataFetched(combinedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, []);

  if (isLoading) {
    return React.createElement('div', { className: 'loading' }, 'Cargando...');
  }
  console.log(items);

  const obtenerDatosFormulario = () => {
    return allFormDataRef.current;
  };

  const handlePreviousClick = () => {
    console.log("Previous function called");
    if (step !== 0) {
      setStep(step - 1);
    }
  };

  const handleNextClick = () => {
    const allFormData = obtenerDatosFormulario();
    sessionStorage.setItem("datosFormulario", JSON.stringify(allFormData));
    setStep(step + 1);
    console.log(allFormData, 'Datos almacenados');
  };

  const SelectedPage = () => {
    if (step === 0) {
      return React.createElement(InfPersonal, { items, setItems, allFormDataRef });
    } else if (step === 1) {
      return React.createElement(Formacion, { items, allFormDataRef });
    } else if (step === 2) {
      return React.createElement(ExpLaboral, { items, setItems });
    } else if (step === 3) {
      return React.createElement(Idiomas, {allFormDataRef});
    } else if (step === 4) {
      return React.createElement(Disponibilidad, { items, setItems });
    }
  };

  return React.createElement('div', { className: 'footer-container' },
    React.createElement(SelectedPage, null),
    React.createElement('hr', { className: 'container-laber-line' }),
    React.createElement('p', { className: 'footer-label', onClick: handlePreviousClick, style: { display: step === 0 ? 'none' : 'inline', marginLeft: step === 4 ? '5%' : '0%' } }, '<- Paso anterior'),
    React.createElement('p', { className: 'footer-label', onClick: handleNextClick, style: { display: step === 4 ? 'none' : 'inline', marginLeft: step === 0 ? '80%' : '32%' } }, 'Siguiente ->'),

  );
}

function InfPersonal({ items, setItems, allFormDataRef }) {
  const handleDataFetched = (fetchedData) => {
    setItems(fetchedData);
    sessionStorage.setItem("apiData", JSON.stringify(fetchedData));
  };
  // Es necesario mover todas las llamadas a la API a un componente padre al que todos los componentes hijos tengan acceso.
  const handleCountryChange = async (event) => {
    const countryId = event.target.value;
    console.log(countryId);
    const response3 = await fetch(`http://localhost:8080/o/fcsai/country/regions-by-countryId/${countryId}`, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa('kevin.munozgil@plexus.es' + ":" + 'test1')
      }
    });
    const provincias = await response3.json();
    let combinedData = JSON.parse(sessionStorage.getItem("apiData"));
    combinedData = {
      perfilprofesional: combinedData.perfilprofesional,
      paises: combinedData.paises,
      provincias
    };
    sessionStorage.setItem("apiData", JSON.stringify(combinedData));
    handleDataFetched(combinedData);

  };

  // Función para manejar los cambios en los campos del formulario
  const handleChangeText = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    let newName = name;

    //convertir la fecha a timestamp
    if (name === 'fechaNacimiento') {
      const date = new Date(value);
      newValue = date.getTime();
    } else if (name === 'teléfono móvil') {
      newName = 'telefonos';
      allFormDataRef.current.telefonos.push({ numero: newValue });
      return;
    } else if (name === 'dirección (vía, número, portal, piso)' || name === 'código postal' || name === 'localidad' || name === 'pais de residencia' || name === 'provincia') {
      if (name === 'dirección (vía, número, portal, piso)') newName = 'calle';
      else if (name === 'código postal') newName = 'cp';
      else if (name === 'pais de residencia') newName = 'pais';
      else if (name === 'provincia') newName = 'region';

      // Actualización de direcciones usando useRef
      const lastAddress = allFormDataRef.current.direcciones[allFormDataRef.current.direcciones.length - 1];
      const updatedAddress = { ...lastAddress, [newName]: newValue };
      allFormDataRef.current.direcciones = [...allFormDataRef.current.direcciones.slice(0, -1), updatedAddress];
      return;
    } else if (name === 'genero' || name === 'nacionalidad') {
      console.log(items.perfilprofesional);
      if (items.perfilprofesional[name === 'genero' ? 'Generos' : 'Nacionalidades'].listTypeEntries && Array.isArray(items.perfilprofesional[name === 'genero' ? 'Generos' : 'Nacionalidades'].listTypeEntries)) {
        const selectedField = items.perfilprofesional[name === 'genero' ? 'Generos' : 'Nacionalidades'].listTypeEntries.find(
          (item) => item.id === parseInt(value)
        );

        if (selectedField) {
          newValue = selectedField.name;
        }
      }

      // Actualización de género o nacionalidad usando useRef
      allFormDataRef.current.perfilProfesional[name] = { key: newValue };
      return;
    }
    console.log(name);
    console.log(newValue);
    allFormDataRef.current[newName] = newValue;
  };


  return (
    React.createElement('div', { className: 'main-container' },
      TitleForm('INFORMACIÓN PERSONAL'),
      React.createElement('div', { className: 'form-container' },
        React.createElement('form', null,
          InputText('Nombre', handleChangeText),
          InputText('Apellidos', handleChangeText),
          InputDate('Fecha de nacimiento', handleChangeText),
          InputSelector('Genero', items, 'Generos', null, handleChangeText),
          InputSelector('Nacionalidad', items, 'Nacionalidades', null, handleChangeText),
          InputText('Teléfono móvil', handleChangeText),
          InputText('Email', handleChangeText),
          InputSelector('Pais de residencia', items, null, handleCountryChange, handleChangeText),
          InputSelector('Provincia', items, null, null, handleChangeText),
          InputText('Dirección (Vía, número, portal, piso)', handleChangeText),
          InputText('Código postal', handleChangeText),
          InputText('Localidad', handleChangeText)
        ),
      )
    )
  );
}

function Formacion({ items, allFormDataRef }) {
  const [components, setComponents] = useState([]);
  let indexToUpdate = 0;


  const handleChangeText = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    let newName = name;
    

    //convertir la fecha a timestamp

    if (name === 'año de titulación') {
      const date = new Date(value);
      newValue = date.getTime();
      newName = 'fechaFin'
    }
    else if (name === 'tipo de formación') {
      newName = 'tipo'
      const selectedField = items.perfilprofesional['Tipo de formacion'].listTypeEntries.find(
        (item) => item.id === parseInt(value)
      );

        if (selectedField) {
          newValue = selectedField.name;
        };
        allFormDataRef.current.perfilProfesional.perfilProfesionalFormacion[indexToUpdate][newName] = { key: newValue };
      return;
    }

    else if (name === 'comentarios' || name === 'centro formativo') {
      if (name === 'comentarios') newName = 'notas';
      else if (name === 'centro formativo') newName = 'centroFormativo';

      allFormDataRef.current.perfilProfesional.perfilProfesionalFormacion[indexToUpdate][newName] = newValue;
      return;
    }

    else if(name == 'especialidad'){
      newName = 'id';

      allFormDataRef.current.perfilProfesional.perfilProfesionalFormacion[indexToUpdate].formacionEspecialidad[indexToUpdate][newName] = {id: newValue};
      return;
    }
    console.log(name);
    console.log(newValue);
    console.log(allFormDataRef.current.perfilProfesional.perfilProfesionalFormacion[newName]);
    allFormDataRef.current.perfilProfesional.perfilProfesionalFormacion[indexToUpdate][newName] = newValue;
  };

  //Mediante el uso de esta funcion puedo añadir tantas veces como quiera el formulario llamado "FormData", pero puede reutilizarse el codigo para
  //Hacerlo con el componente que quieras que se repita.

  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: FormData, items: items, handleChangeText };
    setComponents(prevComponents => [...prevComponents, newFormData]);
    indexToUpdate++;
  };

  useEffect(addNewComponent, []);

  return (
    React.createElement('div', { className: 'main-container' },
      TitleForm('FORMACIÓN'),
      React.createElement('div', { className: 'form-container' },
        React.createElement(AddButton, { name: 'Añadir nueva formación', onClick2: addNewComponent }),
        React.createElement('form', null,
          components.map(component => React.createElement(component.component, { key: component.id, items: items, handleChangeText })),
          TextArea('Comentarios', handleChangeText)
        )
      ),
    )
  );
}

function ExpLaboral({ items, setItems }) {
  const [components, setComponents] = useState([]);

  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: ExpFormData, items: items };
    setComponents(prevComponents => [...prevComponents, newFormData]);
  };

  useEffect(addNewComponent, []);

  return (
    React.createElement('div', { className: 'main-container' },
      TitleForm('EXPERIENCIA LABORAL'),
      React.createElement('div', { className: 'form-container' },
        React.createElement(AddButton, { name: 'Añadir nueva experiencia profesional', onClick2: addNewComponent }),
        React.createElement('form', null,
          components.map(component => React.createElement(component.component, { key: component.id, items: items }))
        )
      ),
    )
  );
}

function Idiomas({allFormDataRef}) {
  let indexToUpdate = 0;

  const handleChangeText = (event) => {
    const { name, value } = event.target;
    let newValue = value;
    let newName = name;
    let indexUpdated = indexToUpdate;

    if(newValue==='on'){
      allFormDataRef.current.perfilProfesional.perfilProfesionalIdioma[indexUpdated].idioma = {key: newName};
      allFormDataRef.current.perfilProfesional.perfilProfesionalIdioma[indexUpdated].nivel = {key: 'c2'};
    }

    console.log(newValue);
    console.log(newName);
    console.log(allFormDataRef.current.perfilProfesional.perfilProfesionalIdioma[indexUpdated][newName]);
    indexToUpdate++;
  }
  return (
    React.createElement('div', { className: 'main-container' },
      TitleForm('IDIOMAS'),
      React.createElement('div', { className: 'form-container' },
        React.createElement('form', null,
          ChechBox('Español', 'check-page4', handleChangeText),
          ChechBox('Francés', 'check-page4', handleChangeText),
          ChechBox('Ingles', 'check-page4', handleChangeText),
          ChechBox('Portugués', 'check-page4', handleChangeText)
        )
      ),
    )
  );
}

function Disponibilidad({ items }) {
  const [components, setComponents] = useState([]);

  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: DisponibilidadFormData, items: items };
    setComponents(prevComponents => [...prevComponents, newFormData]);
  };

  useEffect(addNewComponent, []);
  return (
    React.createElement('div', { className: 'main-container' },
      TitleForm('DISPONIBILIDAD ACTUAL DE PARTICIPACIÓN'),
      React.createElement('div', { className: 'form-container' },
        React.createElement(AddButton, { name: 'Añadir nueva experiencia profesional', onClick2: addNewComponent }),
        React.createElement('form', null,
          components.map(component => React.createElement(component.component, { key: component.id, items: items })),
          React.createElement('div', { className: 'submit-container' },
            React.createElement('input', { type: 'button', className: 'cancel-button', value: 'Cancelar' }),
            React.createElement('input', { type: 'button', className: 'save-button', value: 'Guardar' })
          )
        )
      ),
      TitleForm('PAÍSES DE PREFERENCIA'),
      React.createElement('div', { className: 'form-container' },
        PaisButton('ejemplo-1'), //Los demas botones/datos se sacan directamente de la API
      ),
    )
  );
}

export default FooterForm;