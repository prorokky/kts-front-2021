export const getOrganizationRepoBranchesEndPoint = (
  owner: string, repo: string
) => `/repos/${owner}/${repo}/branches`;

export const getMoreOrganizationReposListEndPoint = (value: string) => `/orgs/${value}/repos`

export const getOrganizationReposListEndPoint = (organizationName: string) => `/orgs/${organizationName}/repos`