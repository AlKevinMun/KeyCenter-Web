import React from "react";

function FooterForm(){
    return(
    React.createElement('div',{className: 'footer-container'},
      React.createElement('hr', {className: 'container-laber-line'}),
      React.createElement('p', {className: 'footer-label'}, 'Siguiente ->'),
    )
    );
}
  
  export default FooterForm;