import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import config from "../../config.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { oauthGoogle, oauthFacebook, logout } from "../../actions/authActions";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import "./style.css";

const homeLink = props => <Link to="/home" {...props} />;

class SocialLogin extends Component {
  state = {
    isLoaded: false
  };
  static propTypes = {
    oauthGoogle: PropTypes.func,
    errorMessage: PropTypes.string,
    oauthFacebook: PropTypes.func,
    logout: PropTypes.func
  };

  isUserAuthenticated() {
    if (this.props.isAuthenticated || this.props.token) {
      this.props.history.push("/home");
    }
  }

  facebookResponse = async response => {
    console.log("facebook response", response);

    await this.props.oauthFacebook(response.accessToken);

    await this.isUserAuthenticated();
  };

  googleResponse = async response => {
    console.log("google response", response);

    await this.props.oauthGoogle(response.accessToken);
    await this.isUserAuthenticated();
  };

  render() {
    return (
      <div className="SocialLogin">
        {this.props.isAuthenticated ? (
          <Fragment>
            <Button
              className="btnProceed"
              variant="outlined"
              component={homeLink}
              color="secondary"
            >
              Proceed to MovieSquare
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <div>
              <FacebookLogin
                appId={config.FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                cssClass="btnFacebook"
                callback={this.facebookResponse}
              />
            </div>
            <div>
              <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                className="btnGoogle"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
              />
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.errorMessage,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
});

export default withRouter(
  connect(
    mapStateToProps,
    { oauthGoogle, oauthFacebook, logout }
  )(SocialLogin)
);
