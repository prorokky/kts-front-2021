import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AppStyles from "./App.module.scss";
import ReposSearchPage from "./pages/ReposSearchPage/ReposSearchPage";

function App() {
  return (
    <div className={AppStyles.component}>
     <BrowserRouter>
        <Switch>
          <Route path="/repos" component={ReposSearchPage} />
          <Redirect to='/repos' />
        </Switch>
    </BrowserRouter> 
    </div>
  );
}

export default App;
