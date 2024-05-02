import React from "react";
import KeyElement from './KeyElement.jsx'

function ServiceKeys() {
    return (
        React.createElement('div', { className: 'service-key-container' },
            React.createElement('ul', { className: 'keys-table' },
                React.createElement('li', { className: 'keys-title' }, 'Llaves en servicio'),
                KeyElement('Llave 1', 'resources/KeyIcon.png'),
                KeyElement('Llave 2', './resources/KeyIcon.png'),
                KeyElement('Llave 3', './resources/KeyIcon.png'),
            ),
        ));
}

export default ServiceKeys;