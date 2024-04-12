import React from "react";

function ChechBox(name, classNames, onClick){
  return(
    React.createElement('div', {className: `check-group ${classNames}`},
        React.createElement('input', {type: 'checkbox', className: 'input', name: name.toLowerCase(),onClick: onClick}),
        React.createElement('label', {className: 'checkbox-label'}, name,)
    )
  );
}
 
  export default ChechBox;