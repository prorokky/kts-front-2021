/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */
import {ApiResponse} from "../../shared/store/ApiStore/types";

export type GetOrganizationReposListParams = {
    organizationName: string
}

export type GitHubRepoOwner = {
    id: number
    avatar_url: string
    login: string
}

export type RepoItem = {
    id: number
    url: string
    name: string
    stargazers_count: number
    updated_at: string
    owner: GitHubRepoOwner
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}
