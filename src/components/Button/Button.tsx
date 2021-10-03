import React from 'react'

import { Meta } from '@utils/meta'

import Buttonstyles from './Button.module.scss'


type ButtonProps = {
    children: React.ReactNode,
    isLoading: Meta,
    onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, onClick }) => {

    return ( 
        <button 
            className={Buttonstyles.search_line__button}
            disabled={isLoading === Meta.loading}
            onClick={onClick}>
            {children}
        </button>
    )
}

export default Button