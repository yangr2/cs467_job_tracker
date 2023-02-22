import React, { Children } from 'react';
import './Button.css';

const buttonTypes = {
    primary: 'primary',
    secondary: 'secondary',
}

function Button({ children, variant="primary", action }) {
  return (
    <button className="button" type="button" onClick={action}>
        {children}
    </button>
  )
}

export default Button;