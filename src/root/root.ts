import {ApiResponse} from '../shared/store/ApiStore/types';
import GitHubStore from '../store/GitHubStore/GitHubStore';
import {GitHubRepoOwner, RepoBranches, RepoItem} from "../store/GitHubStore/types";

const gitHubStore = new GitHubStore();

export type OrganizationName = string
export type FetchPage = number

export const getOrganizationReposListFetch = (organizationName: OrganizationName, page: FetchPage) => 
  gitHubStore.getOrganizationReposList({organizationName, page})
    .then((result: ApiResponse<RepoItem[], any>) => {
      if (result.success) {
        return result.data
      }
  })


export const getOrganizationRepoBranchesFetch = (owner: GitHubRepoOwner["login"], repo: RepoItem["name"]) => 
  gitHubStore.getOrganizationRepoBranches({owner, repo})
    .then((result: ApiResponse<RepoBranches[], any>) => {
      if (result.success) {
        return result.data
      }
  })