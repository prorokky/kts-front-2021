import React, { useCallback } from 'react'

import InputStyles from './Input.module.scss'

type InputProps = {
    value: string,
    placeholder?: string,
    onChange: (value: string) => void
}

const Input: React.FC<InputProps> = ({ value, placeholder = 'Введите название организации', onChange }) => {
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])
    
    return (
        <input 
            className={InputStyles.search_line__input}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}>
        </input>
    )
}

export default React.memo(Input)