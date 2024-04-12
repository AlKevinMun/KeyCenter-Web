import React from "react";

function TextArea(name, onChange){
  return(
    React.createElement('div', {className: 'textarea-group'},
      React.createElement('label', {className: 'textarea-label'}, name),
      React.createElement('textarea', {className: 'textarea', name: name.toLowerCase(), onBlur: onChange})
    )
  );
}
 
  export default TextArea;