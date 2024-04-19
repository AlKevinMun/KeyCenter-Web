import React from "react";

function KeyElement(name, icon){
    return(
    React.createElement('div',{className: 'key-element-container'},
        React.createElement('li', {className: 'key-element'},
            React.createElement('img',{className: 'folder-icon key-icon', src: icon, alt: name}),
            React.createElement('p', { className: 'folder-text' }, name),
        ),
    ));
}

  export default KeyElement;