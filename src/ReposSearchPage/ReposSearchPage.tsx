import React, { useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'
import SearchIcon from '@components/SearchIcon'

import './ReposSearchPage.css'



const ReposSearchPage = () => {
    const [value, setValue] = useState('')

    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handlerButton = () => {
        alert('Нажата кнопка')
    }   

    return (
        <div>
            <form className='search-line'>
                <Input value={value} onChange={handlerInput}/>
                <Button onClick={handlerButton}>
                    <SearchIcon />
                </Button>
            </form>
        </div>
    )
}

export default ReposSearchPage