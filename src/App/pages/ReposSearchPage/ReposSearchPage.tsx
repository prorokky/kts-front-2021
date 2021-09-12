import React, { useEffect, useState } from "react";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import ReposBranchesDrawer from "@components/ReposBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { ReposSearchPageContext } from "@contexts/ReposSearchPageContext";
import { getOrganizationReposListFetch } from "@root/root";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route, Link } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

import ReposSearchPageStyles from "./ReposSearchPage.module.scss";

const ReposSearchPage = () => {
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | undefined>();
  const [page, setPage] = useState<number>(1);

  const load = () => {};

  const handleInput = (value: React.SetStateAction<string>) => {
    setValue(value);
  };

  const handlerButton = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    let promise = getOrganizationReposListFetch(value, page);
    let result = await promise;
    if (result) {
      setRepos(result);
    } else {
      alert("Что-то пошло не так!");
    }
    setValue("");
  };

  useEffect(() => {
    setIsLoading(false);
  }, [repos]);

  const handlerRepo = (event: React.MouseEvent, item: RepoItem) => {
    setSelectedRepo(item);
  };

  const handlerDrawer = () => {
    setSelectedRepo(undefined);
  };

  const ReposBranchesDrawerCall = () => {
    return (
      <ReposBranchesDrawer
        selectedRepo={selectedRepo}
        onClose={handlerDrawer}
      />
    );
  };

  const fetchMoreData = async () => {
    let promise = getOrganizationReposListFetch(repos[0].owner.login, page);
    let result = await promise;
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
          <Button onClick={handlerButton}>
            <SearchIcon />
          </Button>
        </form>
        {repos.length ? 
        <><InfiniteScroll
            dataLength={repos.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Загрузка...</h4>}
            endMessage={<h4>Все репозитории загружены</h4>}
          >
            {repos.map((repo) => (
              <React.Fragment key={repo.id}>
                <div className={ReposSearchPageStyles.card_block}>
                  <div className={ReposSearchPageStyles.card}>
                    <Avatar
                      src={repo.owner.avatar_url}
                      alt="repo_img"
                      letter={repo.name.substring(0, 1).toUpperCase()} />
                    <Link to={`/repos/${repo.name}`}>
                      <RepoTile item={repo} onClick={handlerRepo} />
                    </Link>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </InfiniteScroll><Route path="/repos/:name" component={ReposBranchesDrawerCall} /></> : <></>}
      </div>
    </ReposSearchPageContext.Provider>
  );
};

export default ReposSearchPage;
