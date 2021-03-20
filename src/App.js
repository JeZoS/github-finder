import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import About from "./components/pages/About";
import User from "./components/users/User";
// import moduleName from 'module'

class App extends Component {
  state = {
    users: [],
    repos: [],
    loading: false,
    alert: null,
    user: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await axios.get("https://api.github.com/users");
    this.setState({ users: data, loading: false });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    this.setState({ users: data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    this.setState({ user: data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    this.setState({ repos: data, loading: false });
  };

  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, type) => {
    this.setState({ alert: { msg: message, type: type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 2000);
  };

  render() {
    const { loading, user, users, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUser={this.clearUser}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    repos={repos}
                    getUserRepos={this.getUserRepos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
