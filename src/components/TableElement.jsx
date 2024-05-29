import React from "react";
/*
* El siguiente componente se trata de los elementos visibles dentro del componente de TableList.
* A la hora de crear el componente se debe insertar una string con el titulo que quieres establecer en el elemento,
* una string con la descripción del elemento, otra con la fecha, y una ultima con el estado. También se necesita una
* functión que se utilizara cuando se pulse dentro del propio elemento.
*/
function TableElement({ name, description, date, status, onClick }) {
    // Dependiendo el valor proporcionado por status, se le proporcionara un nuevo valor.
    if (status === 0) { status = 'Enviado' }
    else if (status === 1) { status = 'En curso' }
    else if (status === -1) { status = 'Finalizado' }
    // Cambia el formato de la fecha a la que nosotros queramos.
    const formattedDate = date !== ' ' ?
            new Date(date).toLocaleString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }) : date;
    // Limitar el titulo
    const limitedTopic = name.length > 20 ? description.substring(0, 25) + '...' : name;
    // Limitar la descripción
    const limitedDescription = description.length > 60 ? description.substring(0, 60) + '...' : description;

    // Función para determinar el color del texto basado en el status
    const getStatusColor = () => {
        let color;

        if (status === 'Enviado' || status === 'Disponible') {
            color = 'green';
        } else if (status === 'En curso') {
            color = 'orange';
        } else if (status === 'Finalizado' || status === 'En uso') {
            color = 'red';
        } else {
            color = 'black';
        }

        return color;
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
