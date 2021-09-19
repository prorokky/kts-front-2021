import React from "react";

import { routes } from "@config/routes";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AppStyles from "./App.module.scss";
import ReposSearchPage from "./pages/ReposSearchPage";

function App() {
  return (
    <div className={AppStyles.component}>
     <BrowserRouter>
        <Switch>
          <Route path={routes.repos.path} component={ReposSearchPage} />
          <Redirect to='/repos' />
        </Switch>
    </BrowserRouter> 
    </div>
  );
}

export default App;
