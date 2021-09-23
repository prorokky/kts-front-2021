export type RepoBranchesApi = {
    name: string
}

export type RepoBranchesModel = {
    name: string
}

export const normalizeRepoBranches = (from: RepoBranchesApi): RepoBranchesModel => ({
    name: from.name
}) 