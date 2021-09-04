import React, { useEffect, useState } from "react";

import { getOrganizationRepoBranchesFetch } from "@root/root";
import { Drawer } from "antd";
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
  const [branches, setBranches] = useState<RepoBranches[]>([]);

  useEffect(() => {
    if (selectedRepo) {
      getOrganizationRepoBranchesFetch(
        selectedRepo.owner.login,
        selectedRepo.name
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
    <>
      <Drawer
        title={`Список веток репозитория ${selectedRepo?.name}`}
        placement="right"
        width={500}
        onClose={onClose}
        visible={visible}
      >
        {branches.map((el) => {
          return (
            <React.Fragment key={el.name}>
              <p>{el.name}</p>
            </React.Fragment>
          );
        })}
      </Drawer>
    </>
  );
};

export default ReposBranchesDrawer;
