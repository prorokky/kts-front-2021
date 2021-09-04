import React, { useState } from "react";

import { Drawer } from "antd";
import { RepoItem } from "src/store/GitHubStore/types";

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
  const [branches, setBranches] = useState<RepoItem>();

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={onClose}
      visible={visible}
    ></Drawer>
  );
};

export default ReposBranchesDrawer;
