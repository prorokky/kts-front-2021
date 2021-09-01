import React from 'react'

import './Button.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent) => void,
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
    return (
        <button 
            className="search-line__button"
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button