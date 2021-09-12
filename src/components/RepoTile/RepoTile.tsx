import React from "react";

import StarIcon from "@components/StarIcon";
import { RepoItem } from "src/store/GitHubStore/types";

import "./RepoTile.css";

type RepoTileProps = {
  item: RepoItem;
  onClick: (event: React.MouseEvent, item: RepoItem) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className="card__content" onClick={(event) => onClick(event, item)}>
      <div className="card__repo-info">
        <span className="card__repo-name">{item.name ?? ""}</span>
        <span className="card__company-name">
          {item.owner.login}
        </span>
      </div>
      <div className="card__other-info">
        <span className="card__stars">
          {<StarIcon />}
          {item.stargazers_count}
        </span>
        <span className="card__update-time">
          {item.updated_at.substring(0, 10)}
        </span>
      </div>
    </div>
  );
};

export default RepoTile;
