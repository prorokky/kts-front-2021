import React from "react";

import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

import RepoTileStyles from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItem;
  onClick: (event: React.MouseEvent, item: RepoItem) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
<<<<<<< HEAD
    <div className="card__content" onClick={(event) => onClick(event, item)}>
      <div className="card__repo-info">
        <span className="card__repo-name">{item.name ?? ""}</span>
        <span className="card__company-name">
=======
    <div className={RepoTileStyles.card__content} onClick={(event) => onClick(event, item)}>
      <div className={RepoTileStyles.card__repo_info}>
        <span className={RepoTileStyles.card__repo_name}>{item.name ?? ""}</span>
        <span className={RepoTileStyles.card__company_name}>
>>>>>>> hw-3
          {item.owner.login}
        </span>
      </div>
      <div className={RepoTileStyles.card__other_info}>
        <span className={RepoTileStyles.card__stars}>
          {<StarIcon />}
          {item.stargazers_count}
        </span>
        <span className={RepoTileStyles.card__update_time}>
          {item.updated_at.substring(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default RepoTile;
