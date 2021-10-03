import React from "react";

import StarIcon from "@components/StarIcon";
import { RepoItemModel } from "@store/models/gitHubRepos";

import RepoTileStyles from "./RepoTile.module.scss";

type RepoTileProps = {
  item: RepoItemModel;
  onClick: (event: React.MouseEvent, item: RepoItemModel) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className={RepoTileStyles.card__content} onClick={(event) => onClick(event, item)}>
      <div className={RepoTileStyles.card__repo_info}>
        <span className={RepoTileStyles.card__repo_name}>{item.name ?? ""}</span>
        <span className={RepoTileStyles.card__company_name}>
          {item.owner.login}
        </span>
      </div>
      <div className={RepoTileStyles.card__other_info}>
        <span className={RepoTileStyles.card__stars}>
          {<StarIcon />}
          {item.stargazersCount}
        </span>
        <span className={RepoTileStyles.card__update_time}>
          {item.updatedAt.substring(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default RepoTile;