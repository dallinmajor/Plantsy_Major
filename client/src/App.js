import React, { Component } from 'react';
import Profile from './pages/Profile';
import CreateUser from './pages/CreateUser';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import API from './utils';
import './index.css';
import { read_cookie, delete_cookie} from 'sfcookies';


class App extends Component {
  state = {
    user: false,
    login: false,
  }

  componentDidMount() {
    this.isLoggedIn();
  }

  isLoggedIn() {
    const cookie = read_cookie('User');
    console.log(cookie[0] ? true : false);
    if (cookie[0]) {
      API.User.find(cookie)
        .then(res => this.setState({
          user: res.data
        }));
    } else {
      this.setState({
        login: true
      })
    }
  }


  render() {
    const { login, user, set} = this.state
    return (
      <div>
        <Router>
          <Switch>
            {user ? <Route exact path="/" render={() => <Profile user={user} />} /> : null}
            {login ? <Route exact path="/" render={()=> <Login/>}/>:null}
            <Route exact path="/create" render={()=><CreateUser/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
