import React from "react";

function ChechBox(name){
  return(
    React.createElement('div', {className: 'check-group check-page4'},
        React.createElement('input', {type: 'checkbox', className: 'input'}),
        React.createElement('label', {className: 'checkbox-label'}, name,)
    )
  );
}
 
  export default ChechBox;