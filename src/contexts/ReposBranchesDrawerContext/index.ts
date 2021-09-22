import { createContext, useContext } from "react";

import { RepoItem } from "src/store/GitHubStore/types";

type ReposBranchesContext = {
    repos: RepoItem[];
};

export const ReposBranchesDrawerContext = createContext<ReposBranchesContext>({
    repos: []
});

export const useReposBranchesDrawerContext = () => useContext(ReposBranchesDrawerContext)