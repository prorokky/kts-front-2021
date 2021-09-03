import React, { useState } from 'react'

import Avatar from '@components/Avatar'
import Button from '@components/Button'
import Input from '@components/Input'
import RepoTile from '@components/RepoTile'
import SearchIcon from '@components/SearchIcon'
import './ReposSearchPage.css'
import { getOrganizationReposListFetch } from '@root/root'
import { RepoItem } from 'src/store/GitHubStore/types'

const ReposSearchPage = () => {
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [repos, setRepos] = useState<RepoItem[]>([])

    const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handlerButton = (event: React.MouseEvent) => {
        event.preventDefault()
        setIsLoading(true)
        getOrganizationReposListFetch(value).then(value => {
            if (value) {
                setRepos(value)
            } else {
                alert('Что-то пошло не так!')
            }
        })
        setValue('')
        setIsLoading(false)
    }   
   
    return (
        <div>
            <form className='search-line'>
                <Input value={value} onChange={handlerInput}/>
                <Button disabled={isLoading} onClick={handlerButton}>
                    <SearchIcon/>
                </Button>
            </form>
            {repos.map(el => {
                return <div className='card-block'>
                            <div className='card'>
                                <React.Fragment key={el.owner.id}>
                                    <Avatar 
                                        src={el.owner.avatar_url}
                                        alt='repo_img'
                                        letter={el.name.substring(0,1)}
                                    />
                                    <RepoTile
                                        item={el}
                                    />
                                </React.Fragment>
                            </div>
                        </div>
            })}
        </div>
    )
}

export default ReposSearchPage