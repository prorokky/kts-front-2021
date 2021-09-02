import React, { useState } from 'react'

import Avatar from '@components/Avatar'
import Button from '@components/Button'
import Input from '@components/Input'
import SearchIcon from '@components/SearchIcon'

import './ReposSearchPage.css'

const ReposSearchPage = () => {
    const [value, setValue] = useState('')
    const [disabled, setDisabled] = useState(false)

    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handlerButton = () => {
        setDisabled(true)
        alert('Нажата кнопка')
        setDisabled(false)
    }   

    return (
        <div>
            <form className='search-line'>
                <Input value={value} onChange={handlerInput}/>
                <Button disabled={disabled} onClick={handlerButton}>
                    <SearchIcon currentColor='white'/>
                </Button>
            </form>
            <div className='card-block'>
                <div className='card'>
                    <Avatar letter='K'/>
                </div>
            </div>
        </div>
    )
}

export default ReposSearchPage