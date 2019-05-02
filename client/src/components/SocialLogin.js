import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import config from "../config.json";
import axios from "axios";

export default class SocialLogin extends Component {
  facebookResponse = response => {};

  googleResponse = response => {};

  render() {
    return (
      <div className="SocialLogin">
        <FacebookLogin
          appId={config.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        />
      </div>
    );
  }
}
