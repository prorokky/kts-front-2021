export type GetOrganizationRepoBranchesParams = {
    owner: string
    repo: string
}

export interface IBranchesDrawerStore {
    getOrganizationRepoBranches(params: GetOrganizationRepoBranchesParams): Promise<void>;

}