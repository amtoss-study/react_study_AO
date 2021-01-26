import React from "react";
import { Provider } from "react-redux";
import Nav from "./components/Nav";
import { Route, Switch, Router } from "react-router-dom";
import store, { history } from "./store";
import { userDetailsPath, userListPath } from "./urls";

const App = () => {       
  return(
    <Provider store={store}>
      <Router history={history}>
        <Nav/>
        <Switch>
          <Route path={userListPath} exact={true} component={userListPath} />
          <Route path={userDetailsPath} component={userDetailsPath} />
          <Route>
            <h1>Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>    
  )
}
export default App;