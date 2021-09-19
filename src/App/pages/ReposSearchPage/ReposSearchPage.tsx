import React, { useEffect, useState } from "react";

import Button from "@components/Button";
import Card from "@components/Card";
import Input from "@components/Input";
import ReposBranchesDrawer from "@components/ReposBranchesDrawer";
import SearchIcon from "@components/SearchIcon";
import { ReposSearchPageContext } from "@contexts/ReposSearchPageContext";
import { getOrganizationReposListFetch } from "@root/root";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import ReposSearchPageStyles from "./ReposSearchPage.module.scss";


const ReposSearchPage = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState("")

  const load = () => {};

  const handleInput = (value: React.SetStateAction<string>) => {
    setValue(value);
  };

  const handleSearch = async (event: React.MouseEvent) => {
    event.preventDefault();
    setErrorMessage("")
    setIsLoading(true);
    const result = await getOrganizationReposListFetch(value, page);
    if (result) {
      setRepos(result);
    } else {
      setErrorMessage("Что-то пошло не так")
      setIsLoading(false)
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [repos]);

  const handleRepo = (item: RepoItem) => {
    setSelectedRepo(item.id);
  };

  const handleDrawer = () => {
    setSelectedRepo(undefined);
  };

  const ReposBranchesDrawerCall = () => {
    return (
      <ReposBranchesDrawer
        selectedRepo={selectedRepo}
        repos={repos}
        onClose={handleDrawer}
      />
    );
  };

  const fetchMoreData = async () => {
    const result = await getOrganizationReposListFetch(repos[0].owner.login, page);
    if (result) {
      setRepos(repos.concat(result))
      setPage(page + 1)
    }
  };

  return (
    <ReposSearchPageContext.Provider
      value={{
        repos,
        isLoading,
        load
      }}
    >
      <div>
        <form className={ReposSearchPageStyles.search_line}>
          <Input value={value} onChange={handleInput} />
          <Button onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </form>
        <p className={ReposSearchPageStyles.error_message}>{errorMessage ?? ""}</p>
        {repos.length ? 
          <><InfiniteScroll
            dataLength={repos.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4 className={ReposSearchPageStyles.scroll_message}>Загрузка...</h4>}
            endMessage={<h4 className={ReposSearchPageStyles.scroll_message}>Все репозитории загружены</h4>}
          >
            {repos.map(repo => {
              return <Card key={repo.id} repo={repo} handleRepo={handleRepo} />;
            })}
          </InfiniteScroll></> : <></>}
          <Route path={"/repos/:name"} component={ReposBranchesDrawerCall} />
      </div>
    </ReposSearchPageContext.Provider>
  );
};

export default ReposSearchPage;
