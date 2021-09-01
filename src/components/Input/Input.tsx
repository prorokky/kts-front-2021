import React from 'react'

import './Input.css'

type InputProps = {
    value: string,
    placeholder?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void // убрать вариативность
}

const Input: React.FC<InputProps> = ({ value, placeholder = 'Введите название организации', onChange }) => {
    return (
        <div>
            <input 
                className='search-line__input'
                value={value}
                placeholder={placeholder}
                onChange={onChange}>
            </input>
        </div>
    )
}

export default Input