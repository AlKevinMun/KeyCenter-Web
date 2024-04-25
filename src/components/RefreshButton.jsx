import React from "react";

function RefreshButton(onClick) {

  return (
     React.createElement('div', { className: 'Refresh-Button'},
       React.createElement('img', { src: 'resources/refresh.png', type: 'button', className: 'button-label refresh-icon', onClick: onClick })
     )
  );
 }

  export default RefreshButton;