import React from "react";

import BranchesDrawerStore from "@store/BranchesDrawerStore";
import {RepoBranchesModel} from "@store/models/gitHubRepos/repoBranches";
import {useLocalStore} from "@utils/useLocalStore";

export type BranchesProps = {
    branch: RepoBranchesModel
};

const Branches: React.FC<BranchesProps> = ({branch}) => {
    const branchesDrawerStore = useLocalStore(() => new BranchesDrawerStore())

    return (
        <>
            {branchesDrawerStore.errorMessage ? (
                branchesDrawerStore.errorMessage
            ) : (
                <p>{branch.name}</p>
            )}
        </>

    )
}

export default Branches