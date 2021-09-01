import React, { useState } from 'react'

import Input from '@components/Input'

import './ReposSearchPage.css'

const ReposSearchPage = () => {
    const [value, setValue] = useState('')

    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <div>
            <form className='search-line'>
                <Input value={value} placeholder='Введите название организации' onChange={handlerInput}/>
            </form>
        </div>
    )
}

export default ReposSearchPage