import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { FocusStyleManager  } from "@blueprintjs/core";
import Dashboard from './app/dashboard'
import store from './store'
import * as serviceWorker from './serviceWorker';

import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/select/lib/css/blueprint-select.css"

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
