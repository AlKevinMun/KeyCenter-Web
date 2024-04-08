import React from "react";

function PaisButton(name){
  return(
    React.createElement('div', {className: 'button-group'},
        React.createElement('input', {type: 'button', className: 'button', value: name} ),
    )
  );
}
 
  export default PaisButton;