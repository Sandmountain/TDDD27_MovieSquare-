import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { red, amber, grey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800]
    },
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[800]
    },
    background: {
      default: red
    },
    type: "dark"
  },
  overrides: {
    BottomNavigationAction: {
      // Name of the component ⚛️ / style sheet
      text: {
        // Name of the rule
        color: "white" // Some CSS
      }
    },
    MuiExpansionPanelSummary: {
      content: {
        margin: 0
      }
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
