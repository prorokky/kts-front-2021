import React, { useCallback } from "react";

import Avatar from "@components/Avatar";
import RepoTile from "@components/RepoTile";
import { RepoItemModel } from "@store/models/gitHubRepos";
import { Link } from "react-router-dom";

import CardStyles from './Card.module.scss'

type CardProps = {
    repo: RepoItemModel;
    handleRepo: (item: RepoItemModel) => void
}

const Card: React.FC<CardProps> = ({ repo, handleRepo }) => {
    const selectRepo = useCallback(() => {
        handleRepo(repo)
    }, [handleRepo, repo])

    return(
        <div className={CardStyles.card_block}>
            <div className={CardStyles.card}>
            <Avatar
                src={repo.owner.avatarUrl}
                alt="repo_img"
                letter={repo.name.substring(0, 1).toUpperCase()} />
            <Link className={CardStyles.link} to={`/repos/${repo.name}`}>
                <RepoTile item={repo} onClick={selectRepo} />
            </Link>
            </div>
        </div>
    )
}

export default React.memo(Card)