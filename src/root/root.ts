import {ApiResponse} from '../shared/store/ApiStore/types';
import GitHubStore from '../store/GitHubStore/GitHubStore';
import {RepoItem} from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();

export type OrganizationName = string

export const getOrganizationReposListFetch = (organizationName: OrganizationName) => 
  gitHubStore.getOrganizationReposList({organizationName})
    .then((result: ApiResponse<RepoItem[], any>) => {
      if (result.success) {
        return result.data
      }
  })
