export type GitHubRepoOwnerApi = {
    id: number
    avatar_url: string
    login: string
}

export type GitHubRepoOwnerModel = {
    id: number
    avatarUrl: string
    login: string
}

export const normalizeGitHubRepoOwner = (from: GitHubRepoOwnerApi): GitHubRepoOwnerModel => ({
    id: from.id,
    avatarUrl: from.avatar_url,
    login: from.login
})