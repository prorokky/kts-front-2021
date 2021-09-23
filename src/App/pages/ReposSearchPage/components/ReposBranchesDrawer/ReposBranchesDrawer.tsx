import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { RepoItemModel } from "@store/models/gitHubRepos";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import { Link, useParams } from "react-router-dom";
import { RepoBranches } from "src/store/GitHubStore/types";

import GitHubStore from "../../../../../store/GitHubStore";
import ReposBranchesDrawerStyles from "./ReposBranchesDrawer.module.scss";


export type RepoBranchesDrawerProps = {
  selectedRepo: number;
  repos: RepoItemModel[];
  onClose: () => void;
};

const ReposBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  repos,
  onClose
}) => {
  const VALUE_WIDTH = 500
  const [branches, setBranches] = useState<RepoBranches[]>([]);
  const { name } = useParams<{name: string}>()

  const gitHubStore = useLocalStore(() => new GitHubStore())

  useEffect(() => {
    repos.forEach(repo => {
      if (repo.id === selectedRepo) {
        gitHubStore.getOrganizationRepoBranches({owner: repo.owner.login, repo: name})
          .then((response) => {
            if (response.success) {
              setBranches(response.data);
            } else {
              alert('Не удалось загрузить список репозиториев')
            }
          })
      }
    })
  }, [gitHubStore, name, repos, selectedRepo]);

  return (
      <Link className={ReposBranchesDrawerStyles.link} to='/repos'> 
      <Drawer
        title={`Список веток репозитория ${selectedRepo ? name : ''}`}
        placement="right"
        width={VALUE_WIDTH}
        onClose={onClose}
        visible={selectedRepo ? true : false}
        getContainer={false}
      >
        {branches.map((branch) => {
          return (
            <React.Fragment key={branch.name}>
              <p>{branch.name}</p>
            </React.Fragment>
          );
        })}
      </Drawer>
    </Link>
    
  );
};

export default ReposBranchesDrawer;