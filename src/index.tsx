import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import {createBrowserHistory} from 'history';
import { getConfig } from "./config";
import { BrowserRouter as Router } from 'react-router-dom';
const history = createBrowserHistory();

const onRedirectCallback = (appState) => {
  console.log(window.location.pathname)
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback: (appState: any) => {
    // Check if the URL contains a "code" parameter
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Redirect the user to the dashboard after successful login
      history.push('/dashboard');
    }
  }
};





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Auth0Provider {...providerConfig}>
    <Router>
      <App />
    </Router>

  </Auth0Provider>
);