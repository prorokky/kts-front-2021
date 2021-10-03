import React, { useCallback, useMemo } from "react";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import Loader from "@components/Loader";
import SearchIcon from "@components/SearchIcon";
import ReposListStore from "@store/ReposListStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

import ReposBranchesDrawer from "../ReposBranchesDrawer";
import ReposSearchPageStyles from "./ReposSearchPage.module.scss";

const ReposSearchPage = () => {
  const reposListStore = useLocalStore(() => new ReposListStore())

  const handleInput = useMemo(() => {
    return (value: string) => {
      reposListStore.setValue(value);
    }
  }, [reposListStore]);

  const handleSearch = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      reposListStore.getOrganizationReposList({organizationName: reposListStore.value})
    }, [reposListStore]) 

  const ReposBranchesDrawerCall = useCallback(() => {
    return (
      <ReposBranchesDrawer
        selectedRepo={reposListStore.selectedRepo}
        repos={reposListStore.repos}
        onClose={() => reposListStore.selectRepo(-1)}
      />
    )}, [reposListStore]);

  const fetchMoreData = useCallback(
    () => reposListStore.getMoreOrganizationReposList({organizationName: reposListStore.value}),
    [reposListStore]
  )

  return (
      <div>
        <form className={ReposSearchPageStyles.search_line}>
          <Input value={reposListStore.value} onChange={handleInput} />
          <Button isLoading={reposListStore.meta} onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </form>
        {reposListStore.meta === Meta.loading && <Loader />}
        <p className={ReposSearchPageStyles.error_message}>{reposListStore.errorMessage ?? ""}</p>
        {reposListStore.repos.length ? 
          <><InfiniteScroll
            dataLength={reposListStore.repos.length}
            next={fetchMoreData}
            hasMore={true}
            loader={""}
          >
            {reposListStore.repos.map(repo => {
              return <Card key={repo.id} repo={repo} handleRepo={() => reposListStore.selectRepo(repo.id)} />;
            })}
          </InfiniteScroll></> : <></>}
          <Route path={"/repos/:name"} component={ReposBranchesDrawerCall} />
      </div>
  );
};

export default observer(ReposSearchPage);