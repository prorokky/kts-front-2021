import React, { useCallback, useMemo } from "react";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import SearchIcon from "@components/SearchIcon";
import ReposListStore from "@store/ReposListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";

import ReposBranchesDrawer from "./components/ReposBranchesDrawer";
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
        <p className={ReposSearchPageStyles.error_message}>{reposListStore.errorMessage ?? ""}</p>
        {reposListStore.repos.length ? 
          <><InfiniteScroll
            dataLength={reposListStore.repos.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4 className={ReposSearchPageStyles.scroll_message}>Загрузка...</h4>}
            endMessage={<h4 className={ReposSearchPageStyles.scroll_message}>Все репозитории загружены</h4>}
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