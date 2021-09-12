import React from 'react'

import './Input.css'

type InputProps = {
    value: string,
    placeholder?: string,
    onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, placeholder = 'Введите название организации', onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }
    
    return (
        <input 
            className='search-line__input'
            value={value}
            placeholder={placeholder}
            onChange={handleChange}>
        </input>
    )
}

export default React.memo(Input)