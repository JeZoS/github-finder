import axios from "axios";
import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false,
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

  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearUser={this.clearUser}
            showClear={this.state.users.length > 0 ? true : false}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
