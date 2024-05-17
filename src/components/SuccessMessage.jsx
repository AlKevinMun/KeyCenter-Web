import React from 'react';

const SuccessMessage = ({ message, isVisible }) => {
  if (!isVisible) return null;
  console.log(isVisible);
  console.log(message);

  return (
    React.createElement('div', {className: 'success-message'},
      React.createElement('p', {className: 'success-text'}, message)
    )
  );
}
export default SuccessMessage;