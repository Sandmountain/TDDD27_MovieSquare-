import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import config from "../config.json";
import { connect } from "react-redux";
import { oauthGoogle, oauthFacebook, logout } from "../actions/authActions";
import PropTypes from "prop-types";

class SocialLogin extends Component {
  static propTypes = {
    oauthGoogle: PropTypes.func,
    errorMessage: PropTypes.string,
    oauthFacebook: PropTypes.func,
    logout: PropTypes.func
  };

  onClick = async () => {
    console.log("Logout senor");
    await this.props.logout();
  };

  facebookResponse = async response => {
    console.log("facebook response", response);
    await this.props.oauthFacebook(response.accessToken);
  };

  googleResponse = async response => {
    console.log("google response", response);

    await this.props.oauthGoogle(response.accessToken);
  };

  render() {
    return (
      <div className="SocialLogin">
        {this.props.isAuthenticated ? (
          <button onClick={this.onClick}>Log out</button>
        ) : (
          <div>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { oauthGoogle, oauthFacebook, logout }
)(SocialLogin);
