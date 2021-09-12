import React, { useEffect, useState } from "react";

import Avatar from "@components/Avatar";
import Button from "@components/Button";
import Input from "@components/Input";
import ReposBranchesDrawer from "@components/ReposBranchesDrawer";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import "./ReposSearchPage.css";
import { ReposSearchPageContext } from "@contexts/ReposSearchPageContext";
import { getOrganizationReposListFetch } from "@root/root";
import { Route, Link } from "react-router-dom";
import { RepoItem } from "src/store/GitHubStore/types";

const ReposSearchPage = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<RepoItem | undefined>();
  const [visible, setVisible] = useState(false);

  const load = () => {}

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlerButton = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    let promise = getOrganizationReposListFetch(value)
    let result = await promise
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
    setVisible(true);
  };

  const handlerDrawer = () => {
    setVisible(false);
  };

  const ReposBranchesDrawerCall = () => {
    return (
      <ReposBranchesDrawer
        selectedRepo={selectedRepo}
        onClose={handlerDrawer}
        visible={visible}
      />
    );
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
        <form className="search-line">
          <Input value={value} onChange={handlerInput} />
          <Button onClick={handlerButton}>
            <SearchIcon />
          </Button>
        </form>
        {repos.map((repo) => (
          <React.Fragment key={repo.id}>
            <div className="card-block">   
              <div className="card">
                <Avatar
                  src={repo.owner.avatar_url}
                  alt="repo_img"
                  letter={repo.name.substring(0, 1).toUpperCase()}
                />
                <RepoTile item={repo} onClick={handlerRepo} />
              </div> 
            </div>
          </React.Fragment>
        )
      )}
        <Route path="/repos/:name" component={ReposBranchesDrawerCall} />
      </div>
    </ReposSearchPageContext.Provider>
  );
};

export default ReposSearchPage;
