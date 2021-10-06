import { GitHubRepoOwnerApi, GitHubRepoOwnerModel, normalizeGitHubRepoOwner } from './gitHubRepoOwner';

export type RepoItemApi = {
    id: number
    url: string
    name: string
    stargazers_count: number
    updated_at: string
    description: string
    forks_count: number
    default_branch: string
    language: string | null
    homepage: string
    watchers_count: number
    owner: GitHubRepoOwnerApi
}

export type RepoItemModel = {
    id: number
    url: string
    name: string
    stargazersCount: number
    updatedAt: string
    description: string
    forks_count: number
    default_branch: string
    language: string | null
    homepage: string
    watchers_count: number
    owner: GitHubRepoOwnerModel
}

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
    id: from.id,
    url: from.url,
    name: from.name,
    stargazersCount: from.stargazers_count,
    updatedAt: from.updated_at,
    description: from.description,
    forks_count: from.forks_count,
    default_branch: from.default_branch,
    language: from.language,
    homepage: from.homepage,
    watchers_count: from.watchers_count,
    owner: normalizeGitHubRepoOwner(from.owner)
})