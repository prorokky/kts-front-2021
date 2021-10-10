import React, {useCallback, useEffect, useMemo} from "react";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import Loader from "@components/Loader";
import SearchIcon from "@components/SearchIcon";
import ReposListStore from "@store/ReposListStore";
import {Meta} from "@utils/meta";
import {useLocalStore} from "@utils/useLocalStore";
import {observer} from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, useHistory } from "react-router-dom";

import ReposBranchesDrawer from "../ReposBranchesDrawer";
import ReposSearchPageStyles from "./ReposSearchPage.module.scss";

const ReposSearchPage = () => {
    const reposListStore = useLocalStore(() => new ReposListStore())
    const history = useHistory();

    useEffect(() => {
        reposListStore.getDefaultGitRepos({organizationName: 'git'})
    }, [])

    const handleInput = useMemo(() => {
        return (value: string) => {
            reposListStore.setValue(value);
        }
    }, [reposListStore]);

    const ReposBranchesDrawerCall = useCallback(() => {
        return (
            <ReposBranchesDrawer
                selectedRepo={reposListStore.selectedRepo}
                onClose={() => reposListStore.selectRepo(null)}
            />
        )
    }, [reposListStore]);

    const handleRepo = useCallback((repo) => reposListStore.selectRepo(repo), [reposListStore])

    return (
        <div>

            <form className={ReposSearchPageStyles.search_line}>
                <Input value={reposListStore.value} onChange={(event) => {
                    reposListStore.setValue(event);
                    history.push(`?search=${reposListStore.value}`);
                    }
                }/>
                <Button isLoading={reposListStore.meta} onClick={() =>
                    reposListStore.getOrganizationReposList({organizationName: reposListStore.value})
                }>
                    <SearchIcon/>
                </Button>
            </form>

            {reposListStore.meta === Meta.loading && <Loader/>}

            <p className={ReposSearchPageStyles.error_message}>{reposListStore.errorMessage ?? ""}</p>

            {reposListStore.repos.length ?
                <><InfiniteScroll
                    dataLength={reposListStore.repos.length}
                    next={reposListStore.getMoreOrganizationReposList}
                    hasMore={true}
                    loader={""}
                >
                    {reposListStore.repos.map(repo => {
                        return <Card key={repo.id} repo={repo} handleRepo={() => handleRepo(repo)}/>;
                    })}
                </InfiniteScroll></> :
                    reposListStore.default_repos.map(repo => {
                    return <Card key={repo.id} repo={repo} handleRepo={() => handleRepo(repo)}/>;
                })
            }

            <Route path={"/repos/:name"} component={ReposBranchesDrawerCall}/>
        </div>
    );
};

export default observer(ReposSearchPage);