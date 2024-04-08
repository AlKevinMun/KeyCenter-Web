import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

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
      // Aquí se realiza la llamada a la API solo si los datos no están almacenados previamente

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
                // Variable que junta todas las llamadas a la API
                const combinedData = {
                  perfilprofesional,
                  paises,
                  provincias
                };

                // Store the combined data in sessionStorage
                sessionStorage.setItem("apiData", JSON.stringify(combinedData));

                // Call handleDataFetched with the combined data
                handleDataFetched(combinedData);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };
        
      fetchData();
    }
}, []);


  if (isLoading) {
      return React.createElement('div', {className: 'loading'}, 'Cargando...'); // Muestra un indicador de carga mientras se espera la respuesta de la API
  }
    console.log(items);
   

 const handlePreviousClick = () => {
    console.log("Previous function called");
    if (step !== 0) {
      setStep(step - 1);
    }
 };

 const handleNextClick = () => {
    console.log("Next function called");
    setStep(step + 1);
 };

 const SelectedPage = () => {
    if (step === 0) {
      return React.createElement(InfPersonal, { items, setItems });
    } else if (step === 1) {
      return React.createElement(Formacion, { items, setItems });
    } else if (step === 2) {
      return React.createElement(ExpLaboral, { items, setItems });
    } else if (step === 3) {
      return React.createElement(Idiomas, null);
    } else if (step === 4) {
      return React.createElement(Disponibilidad, { items, setItems });
    }
 };

 return React.createElement('div', { className: 'footer-container' },
    React.createElement(SelectedPage, null), // Render the SelectedPage component
    React.createElement('hr', { className: 'container-laber-line' }),
    React.createElement('p', { className: 'footer-label', onClick: handlePreviousClick, style: { display: step === 0 ? 'none' : 'inline', marginLeft: step === 4 ? '5%' : '0%' } }, '<- Paso anterior'),
    React.createElement('p', { className: 'footer-label', onClick: handleNextClick, style: { display: step === 4 ? 'none' : 'inline', marginLeft: step === 0 ? '80%' : '32%' } }, 'Siguiente ->'),
    
 );
}

function InfPersonal({ items, setItems }){
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
      perfilprofesional:combinedData.perfilprofesional,
      paises:combinedData.paises,
      provincias
    };
    sessionStorage.setItem("apiData", JSON.stringify(combinedData));
    handleDataFetched(combinedData);
  
  };
    return(
    React.createElement('div',{className: 'main-container'},
      TitleForm('INFORMACIÓN PERSONAL'),
      React.createElement('div', {className: 'form-container'},
        React.createElement('form', null,
        InputText('TU MAMA'),
        InputText('Apellidos'),
        InputDate('Fecha de nacimiento'),
        InputSelector('Genero',null, 'Generos', null),
        InputSelector('Nacionalidad',null, 'Nacionalidades', null),
        InputText('Teléfono móvil'),
        InputText('Email'),
        InputSelector ('Pais de residencia', null, null, handleCountryChange),
        InputSelector('Provincia', null, null, null),
        InputText('Dirección (Vía, número, portal, piso)'),
        InputText('Código postal'),
        InputText('Localidad')
        ),
      )
    )
    );
}

function Formacion({ items, setItems }){
  const [components, setComponents] = useState([]);
  
  //Mediante el uso de esta funcion puedo añadir tantas veces como quiera el formulario llamado "FormData", pero puede reutilizarse el codigo para
  //Hacerlo con el componente que quieras que se repita.

  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: FormData, items: null };
    setComponents(prevComponents => [...prevComponents, newFormData]);
  }; 

  useEffect(addNewComponent, []);
  
  return(
  React.createElement('div',{className: 'main-container'},
    TitleForm('FORMACIÓN'),
    React.createElement('div', {className: 'form-container'},
    React.createElement(AddButton, { name: 'Añadir nueva formación', onClick2: addNewComponent}),
    React.createElement('form', null,
    components.map(component => React.createElement(component.component, { key: component.id, items: items })),
        TextArea('Comentarios')
      )
    ), 
  )
  );
}

function ExpLaboral({ items, setItems }){
  const [components, setComponents] = useState([]);
  
  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: ExpFormData };
    setComponents(prevComponents => [...prevComponents, newFormData]);
  }; 

  useEffect(addNewComponent, []);
  
  return(
  React.createElement('div',{className: 'main-container'},
    TitleForm('EXPERIENCIA LABORAL'),
    React.createElement('div', {className: 'form-container'},
    React.createElement(AddButton, { name: 'Añadir nueva experiencia profesional', onClick2: addNewComponent}),
    React.createElement('form', null,
    components.map(component => React.createElement(component.component, { key: component.id }))
      )
    ), 
  )
  );
}

function Idiomas(){
  return(
    React.createElement('div',{className: 'main-container'},
      TitleForm('IDIOMAS'),
      React.createElement('div', {className: 'form-container'},
        React.createElement('form', null,
        ChechBox('Español'),
        ChechBox('Francés'),
        ChechBox('Ingles'),
        ChechBox('Portugués')
        )
      ),
    )
  );
}

function Disponibilidad(){
  const [components, setComponents] = useState([]);
  
  const addNewComponent = () => {
    const newId = Date.now();
    const newFormData = { id: newId, component: DisponibilidadFormData };
    setComponents(prevComponents => [...prevComponents, newFormData]);
  }; 

  useEffect(addNewComponent, []);
  return(
    React.createElement('div',{className: 'main-container'},
      TitleForm('DISPONIBILIDAD ACTUAL DE PARTICIPACIÓN'),
      React.createElement('div', {className: 'form-container'},
      React.createElement(AddButton, { name: 'Añadir nueva experiencia profesional', onClick2: addNewComponent}),
      React.createElement('form', null,
      components.map(component => React.createElement(component.component, { key: component.id })),
      React.createElement('div', {className: 'submit-container'},
        React.createElement('input',{type: 'button' ,className: 'cancel-button', value: 'Cancelar'}),
        React.createElement('input',{type: 'button' ,className: 'save-button', value: 'Guardar'})
        )
      )
      ),
      TitleForm('PAÍSES DE PREFERENCIA'),
      React.createElement('div', {className: 'form-container'},
      PaisButton('ejemplo-1'), //Los demas botones/datos se sacan directamente de la API
      ),
    )
  );
}
  
  export default FooterForm;
