import React, { Component } from "react";
import SocialLogin from "./SocialLogin";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <h1 className="App-title">Social login</h1>
        <p className="App-intro">To get started, authenticate with Facebook.</p>
        <SocialLogin />
      </div>
    );
  }
}

export default LoginPage;
