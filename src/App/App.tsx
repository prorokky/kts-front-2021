import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import ReposSearchPage from "./pages/ReposSearchPage/ReposSearchPage";

function App() {
  return (
    <div className="component">
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
