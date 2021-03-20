import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  static propType = {
    searchUsers: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: "" });
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            value={this.state.text}
            onChange={this.onChange}
            name="text"
            placeholder="Search Users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {this.props.showClear ? (
          <button
            className="btn btn-light btn-block"
            onClick={this.props.clearUser}
          >
            Clear
          </button>
        ) : null}
      </div>
    );
  }
}

export default Search;
