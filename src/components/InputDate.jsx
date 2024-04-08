import React from "react";

function InputDate(name){
  return(
    React.createElement('div', {className: 'input-group'},
      React.createElement('label', {className: 'input-label'}, name,),
      React.createElement('input', {type: 'date', className: 'input'})
    )
  );
}
 
  export default InputDate;