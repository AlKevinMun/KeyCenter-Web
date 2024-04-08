import React from "react";

function TitleForm(name){
    return(
    React.createElement('div',{className: 'title-container'},
      React.createElement('p', {className: 'container-label'}, name),
      React.createElement('hr', {className: 'container-laber-line'}),
    )
    );
}
  
  export default TitleForm;