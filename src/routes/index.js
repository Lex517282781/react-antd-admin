import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncComponent } from '@/utils';

const Dashboard = asyncComponent(() => import('@/pages/Dashboard'));
const AAAA = asyncComponent(() => import('@/pages/AAAA'));
const AAB = asyncComponent(() => import('@/pages/AAB'));

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
        <Route exact path="/app/aaaa" component={AAAA} />
        <Route exact path="/app/aab" component={AAB} />
      </Switch>
    );
  }
}

export default Routers;
