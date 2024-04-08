import React from "react";

function InputText(name){
  return(
    React.createElement('div', {className: 'input-group'},
      React.createElement('label', {className: 'input-label'}, name),
      React.createElement('input', {type: 'text', className: 'input'})
    )
  );
}
 
  export default InputText;