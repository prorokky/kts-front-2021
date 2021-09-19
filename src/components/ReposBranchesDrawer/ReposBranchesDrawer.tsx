import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { ReposBranchesDrawerContext } from "@contexts/ReposBranchesDrawerContext";
import { getOrganizationRepoBranchesFetch } from "@root/root";
import { Drawer } from "antd";
import { Link, useParams } from "react-router-dom";
import { RepoBranches, RepoItem } from "src/store/GitHubStore/types";

import ReposBranchesDrawerStyles from "./ReposBranchesDrawer.module.scss";

export type RepoBranchesDrawerProps = {
  selectedRepo: number | undefined;
  onClose: () => void;
};

const ReposBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose
}) => {
<<<<<<< HEAD
  const VALUE_WIDTH = 500  
=======
  const VALUE_WIDTH = 500
>>>>>>> hw-3
  const [branches, setBranches] = useState<RepoBranches[]>([]);
  const { name } = useParams<{name: string}>()
  const [repos, setRepos] = useState<RepoItem[]>([])

  useEffect(() => {
    setRepos(repos)
  }, [repos])

  useEffect(() => {
    repos.forEach(repo => {
      if (repo.id === selectedRepo) {
        getOrganizationRepoBranchesFetch(
          repo.owner.login,
          name
        ).then((data) => {
          if (data) {
            setBranches(data);
          } else {
              alert('Не удалось загрузить список репозиториев')
          }
        });
      }
    })
  }, [name, repos, selectedRepo]);

  return (
    <ReposBranchesDrawerContext.Provider
      value={{
        repos
      }}
    >
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
    </ReposBranchesDrawerContext.Provider>
    
  );
};

export default ReposBranchesDrawer;
