import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncComponent } from '@/utils';

const AAAA = asyncComponent(() => import('@/pages/AAAA'));
const AAAB = asyncComponent(() => import('@/pages/AAAB'));
const AAB = asyncComponent(() => import('@/pages/AAB'));
const AAC = asyncComponent(() => import('@/pages/AAC'));
const AAD = asyncComponent(() => import('@/pages/AAD'));
const AB = asyncComponent(() => import('@/pages/AB'));
const BA = asyncComponent(() => import('@/pages/BA'));
const C = asyncComponent(() => import('@/pages/C'));

class AppRouters extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/app" render={() => <Redirect to="/app/c" push />} />
        <Route exact path="/app/aaaa" component={AAAA} />
        <Route exact path="/app/aaab" component={AAAB} />
        <Route exact path="/app/aab" component={AAB} />
        <Route exact path="/app/aac" component={AAC} />
        <Route exact path="/app/aad" component={AAD} />
        <Route exact path="/app/ab" component={AB} />
        <Route path="/app/ba/:id" component={BA} />
        <Route exact path="/app/c" component={C} />
        <Route exact path="/app/baa" component={C} />
        {/* <Route render={() => <Redirect to="/app/c" />} /> */}
      </Switch>
    );
  }
}

export default AppRouters;
