import React, { useContext } from 'react'

import { ReposSearchPageContext } from '@contexts/ReposSearchPageContext'

import './Button.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const reposContext = useContext(ReposSearchPageContext)

    return ( 
        <button 
            className="search-line__button"
            disabled={reposContext.isLoading}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button