import React from "react";

import Avatar from "@components/Avatar";
import RepoTile from "@components/RepoTile";
import { Link } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import CardStyles from './Card.module.scss'

type CardProps = {
    repo: RepoItem;
    handleRepo: (item: RepoItem) => void
}

const Card: React.FC<CardProps> = ({ repo, handleRepo }) => {
    const selectRepo = () => {
        handleRepo(repo)
    }

    return(
        <div className={CardStyles.card_block}>
            <div className={CardStyles.card}>
            <Avatar
                src={repo.owner.avatar_url}
                alt="repo_img"
                letter={repo.name.substring(0, 1).toUpperCase()} />
            <Link className={CardStyles.link} to={`/repos/${repo.name}`}>
                <RepoTile item={repo} onClick={selectRepo} />
            </Link>
            </div>
        </div>
    )
}

export default Card