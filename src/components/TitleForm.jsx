import React from "react";
/*
* El siguiente componente se trata del titulo de las paginas.
* A la hora de crear el componente se debe insertar el texto que se quiere mostrar en el titulo (name),
*
*/
function TitleForm(name) {

    let a;

    if (name === "Sign up" || name === "Sign in") {
        a = 'form-title';
    } else {
        a = 'container-label';
    }


    return (
        React.createElement('div', { className: 'title-container' },
            React.createElement('p', { className: a }, name),
            React.createElement('hr', { className: 'container-label-line' }),
        )
    );
}

export default TitleForm;