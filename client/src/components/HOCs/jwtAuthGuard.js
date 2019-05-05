import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ParentComponent extends Component {
    isUserAuthenticated() {
      if (!this.props.isAuthenticated || !this.props.token) {
        this.props.history.push("/");
      }
    }

    componentDidMount() {
      this.isUserAuthenticated();
    }

    componentDidUpdate() {
      this.isUserAuthenticated();
    }

    render() {
      return <ChildComponent />;
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  });

  return connect(mapStateToProps)(ParentComponent);
};
