import React from "react";

function TitleForm(name){

    let a;

    if (name === "Sign up" || name === "Sign in") {
        a = 'form-title';
    } else {
        a = 'container-label';
    }


    return(
    React.createElement('div',{className: 'title-container'},
    React.createElement('p', {className: a}, name),
    React.createElement('hr', {className: 'container-label-line'}),
    )
    );
}
  
  export default TitleForm;