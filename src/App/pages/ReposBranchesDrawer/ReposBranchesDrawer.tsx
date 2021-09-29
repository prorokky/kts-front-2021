import React, { useEffect } from "react";
import "antd/dist/antd.css";

import BranchesDrawerStore from "@store/BranchesDrawerStore";
import { RepoItemModel } from "@store/models/gitHubRepos";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

import ReposBranchesDrawerStyles from "./ReposBranchesDrawer.module.scss";

export type RepoBranchesDrawerProps = {
  selectedRepo: number;
  repos: RepoItemModel[];
  onClose: () => void;
};

const ReposBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  repos,
  onClose,
}) => {
  const VALUE_WIDTH = 500;
  const { name } = useParams<{ name: string }>();

  const branchesDrawerStore = useLocalStore(() => new BranchesDrawerStore())

  useEffect(() => {
    repos.forEach((repo) => {
      if (repo.id === selectedRepo) {
        branchesDrawerStore.getOrganizationRepoBranches({
          owner: repo.owner.login,
          repo: name,
        });
      }
    });
  }, [branchesDrawerStore, name, repos, selectedRepo]);

  return (
    <Link className={ReposBranchesDrawerStyles.link} to="/repos">
      <Drawer
        title={`Список веток репозитория ${selectedRepo ? name : ""}`}
        placement="right"
        width={VALUE_WIDTH}
        onClose={onClose}
        visible={selectedRepo ? true : false}
        getContainer={false}
      >
        {branchesDrawerStore.branches.map((branch) => {
          return (
            <React.Fragment key={branch.name}>
              {branchesDrawerStore.errorMessage ? (
                branchesDrawerStore.errorMessage
              ) : (
                <p>{branch.name}</p>
              )}
            </React.Fragment>
          );
        })}
      </Drawer>
    </Link>
  );
};

export default observer(ReposBranchesDrawer);
