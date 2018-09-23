import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'; //  BrowserRouter HashRouter
import App from './App';
import NotFound from './404';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/app" push />} />
      <Route path="/app" component={App} />
      {/* <Route path="/404" component={NotFound} /> */}
      <Route component={NotFound} />
    </Switch>
  </Router>
);
