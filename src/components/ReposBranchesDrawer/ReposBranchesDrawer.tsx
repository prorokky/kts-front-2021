import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

import { getOrganizationRepoBranchesFetch } from "@root/root";
import { Drawer } from "antd";
import { Link, useParams } from "react-router-dom";
import { RepoBranches, RepoItem } from "src/store/GitHubStore/types";

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | undefined;
  onClose: () => void;
  visible: boolean;
};

const ReposBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  visible
}) => {
  const VALUE_WIDTH = 500
  const [branches, setBranches] = useState<RepoBranches[]>([]);
  const { name } = useParams<{name: string}>()

  useEffect(() => {
    if (selectedRepo) {
      getOrganizationRepoBranchesFetch(
        selectedRepo.owner.login,
        name
      ).then((data) => {
        if (data) {
          setBranches(data);
        } else {
            alert('Не удалось загрузить список репозиториев')
        }
      });
    }
  });

  return (
    //TODO: исправить, чтобы ссылка была на крестик
    <Link to='/repos'> 
      <Drawer
        title={`Список веток репозитория ${selectedRepo ? name : ''}`}
        placement="right"
        width={VALUE_WIDTH}
        onClose={onClose}
        visible={visible}
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
