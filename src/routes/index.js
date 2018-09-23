import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncComponent } from '@/utils';

const Dashboard = asyncComponent(() => import('@/pages/Dashboard'));

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" push />}
        />
        <Route exact path="/app/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default Routers;
