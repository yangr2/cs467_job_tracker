import React, { Children } from 'react';
import './Button.css';

function Button({ children, action }) {
  return (
    <button className="button" type="button" onClick={action}>
        {children}
    </button>
  )
}

export default Button;