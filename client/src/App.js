import React, { Component } from 'react';
import Profile from './pages/Profile';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {read_cookie} from 'sfcookies';


class App extends Component {

  render() {

    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/create" component={CreateUser} />
              <Route exact path="/profile/:id" component={Profile} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
