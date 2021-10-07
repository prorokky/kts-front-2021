import React from 'react'

import RepoInfoStyle from './RepoInfo.module.scss'
import {RepoItemModel} from "@store/models/gitHubRepos";

type RepoInfoProps = {
    org: RepoItemModel
}

const RepoInfo: React.FC<RepoInfoProps> = ({ org }) => {
    return(
        <div>
            {org.description && <p>Описание: {org.description}</p>}
            {org.description && <p>Главная ветка: {org.default_branch}</p>}
            {org.language && <p>Язык: {org.language}</p>}
            {org.homepage && <p>Домашняя страница: {org.homepage}</p>}
            {org.watchers_count != 0 ? <p>Количество наблюдателей: {org.watchers_count}</p> : ""}
            {org.forks_count != 0 ? <p>Количество ответвлений (forks): {org.forks_count}</p> : ""}
        </div>
    )
}

export default RepoInfo