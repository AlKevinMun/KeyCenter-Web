import React from "react";

function AddButton({ name, onClick2}) {

  return (
     React.createElement('div', { className: 'button-group',  onClick: () => onClick2() },
       React.createElement('p', { className: 'button-label' }, name),
       React.createElement('p', { className: 'icon-plus' }, '+') 
     )
  );
 }
 
  export default AddButton;