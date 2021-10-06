import React, {useEffect} from "react";
import "antd/dist/antd.css";

import Branches from "@components/Branches";
import BranchesDrawerStore from "@store/BranchesDrawerStore";
import {RepoItemModel} from "@store/models/gitHubRepos";
import {useLocalStore} from "@utils/useLocalStore";
import {Drawer} from "antd";
import {observer} from "mobx-react-lite";
import {Link, useParams} from "react-router-dom";

import ReposBranchesDrawerStyles from "./ReposBranchesDrawer.module.scss";
import RepoInfo from "@components/RepoInfo";

export type RepoBranchesDrawerProps = {
    selectedRepo: RepoItemModel | null;
    onClose: () => void;
};

const ReposBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
                                                                    selectedRepo,
                                                                    onClose,
                                                                }) => {
    const VALUE_WIDTH = 500;
    const {name} = useParams<{ name: string }>();

    const branchesDrawerStore = useLocalStore(() => new BranchesDrawerStore())

    useEffect(() => {
        if (selectedRepo) {
            branchesDrawerStore.getOrganizationRepoBranches({
                owner: selectedRepo.owner.login,
                repo: name,
            });
        }
        ;
    }, [branchesDrawerStore, name, selectedRepo]);

    return (
        <Link className={ReposBranchesDrawerStyles.link} to="/repos">
            <Drawer
                title={`Список веток и информация репозитория ${selectedRepo ? name : ""}`}
                placement="right"
                width={VALUE_WIDTH}
                onClose={onClose}
                visible={selectedRepo ? true : false}
                getContainer={false}
            >
                <p className={ReposBranchesDrawerStyles.info_header}>Список веток:</p>
                {branchesDrawerStore.branches.map((branch) => {
                    return (
                        <React.Fragment key={branch.name}>
                            <Branches branch={branch}/>
                        </React.Fragment>
                    );
                })}
                <p className={ReposBranchesDrawerStyles.info_header}>Информация:</p>
                {selectedRepo && <RepoInfo org={selectedRepo}/>}
            </Drawer>
        </Link>
    );
};

export default observer(ReposBranchesDrawer);
