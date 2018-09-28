import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncComponent } from '@/utils';

const AAAA = asyncComponent(() => import('@/pages/AAAA'));
const AAB = asyncComponent(() => import('@/pages/AAB'));
const C = asyncComponent(() => import('@/pages/C'));

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/app" render={() => <Redirect to="/app/c" push />} />
        <Route exact path="/app/aaaa" component={AAAA} />
        <Route exact path="/app/aab" component={AAB} />
        <Route exact path="/app/c" component={C} />
      </Switch>
    );
  }
}

export default Routers;
