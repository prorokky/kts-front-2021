import {ApiResponse} from '../shared/store/ApiStore/types';
import GitHubStore from '../store/GitHubStore/GitHubStore';
import {RepoBranches, RepoItem} from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();

export type OrganizationName = string
export type Owner = string
export type Repo = string

export const getOrganizationReposListFetch = (organizationName: OrganizationName) => 
  gitHubStore.getOrganizationReposList({organizationName})
    .then((result: ApiResponse<RepoItem[], any>) => {
      if (result.success) {
        return result.data
      }
  })


export const getOrganizationRepoBranchesFetch = (owner: Owner, repo: Repo) => 
  gitHubStore.getOrganizationRepoBranches({owner, repo})
    .then((result: ApiResponse<RepoBranches[], any>) => {
      if (result.success) {
        return result.data
      }
  })