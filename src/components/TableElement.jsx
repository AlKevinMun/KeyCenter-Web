import React from "react";

function TableElement({ name, description, date, status, onClick }) {
    if (status === 0) { status = 'Enviado' }
    else if (status === 1) { status = 'En curso' }
    else if (status === -1) { status = 'Finalizado' }

    const formattedDate = new Date(date).toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    // Limitar el titulo
    const limitedTopic = name.length > 20 ? description.substring(0, 25) + '...' : name;
    // Limitar la descripción
    const limitedDescription = description.length > 60 ? description.substring(0, 60) + '...' : description;

    // Función para determinar el color del texto basado en el status
    const getStatusColor = () => {
        switch (status) {
            case 'Enviado':
                return 'green';
            case 'En curso':
                return 'orange';
            case 'Finalizado':
                return 'red';
            default:
                return 'black';
        }
    };

    // Aplicar el estilo condicionalmente
    const statusStyle = { color: getStatusColor() };

    return (
        React.createElement('li', { className: 'TableElement-li', onClick: onClick }, // Añade onClick aquí
            React.createElement('div', { className: 'TableElement-container' },
                React.createElement('div', null,
                    React.createElement('p', { className: 'TableElement-name' }, limitedTopic),
                    React.createElement('p', { className: 'TableElement-description' }, limitedDescription),
                ),
                React.createElement('div', null,
                    React.createElement('p', { className: 'TableElement-date' }, formattedDate),
                    React.createElement('p', { className: 'TableElement-status', style: statusStyle }, status),
                ),
            )
        )
    );
}

export default TableElement;
