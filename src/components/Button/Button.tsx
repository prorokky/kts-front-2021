import React from 'react'

import { useReposContext } from '@contexts/ReposSearchPageContext'

import Buttonstyles from './Button.module.scss'

type ButtonProps = {
    children: React.ReactNode,
    onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
    const reposContext = useReposContext()

    return ( 
        <button 
            className={Buttonstyles.search_line__button}
            disabled={reposContext.isLoading}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button