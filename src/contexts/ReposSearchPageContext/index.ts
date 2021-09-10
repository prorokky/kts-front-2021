import { createContext } from "react";

import { RepoItem } from "src/store/GitHubStore/types";

type ReposContext = {
    repos: RepoItem[];
    isLoading: boolean;
    load: () => void;
};

export const ReposSearchPageContext = createContext<ReposContext>({
    repos: [],
    isLoading: false,
    load: () => {}
  });