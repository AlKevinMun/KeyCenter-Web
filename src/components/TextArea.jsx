import React from "react";

function TextArea(name){
  return(
    React.createElement('div', {className: 'textarea-group'},
      React.createElement('label', {className: 'textarea-label'}, name),
      React.createElement('textarea', {className: 'textarea'})
    )
  );
}
 
  export default TextArea;