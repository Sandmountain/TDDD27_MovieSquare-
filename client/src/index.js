import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline
} from "@material-ui/core";
import { amber, grey } from "@material-ui/core/colors";

//Creates the theme used on the page
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: grey[800]
    },
    secondary: {
      main: amber.A400,
      light: amber[200],
      dark: amber[800]
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
        margin: 2
      }
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />

    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
