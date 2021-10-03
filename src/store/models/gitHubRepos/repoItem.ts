import { GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner } from './gitHubRepoOwner';

export type RepoItemApi = {
    id: number
    url: string
    name: string
    stargazers_count: number
    updated_at: string
    owner: GitHubRepoOwnerApi
}

export type RepoItemModel = {
    id: number
    url: string
    name: string
    stargazersCount: number
    updatedAt: string
    owner: GitHubRepoOwnerModel
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
    id: from.id,
    url: from.url,
    name: from.name,
    stargazersCount: from.stargazers_count,
    updatedAt: from.updated_at,
    owner: normalizeGitHubRepoOwner(from.owner)
})