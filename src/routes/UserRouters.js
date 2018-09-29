import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { asyncComponent } from '@/utils';

const Login = asyncComponent(() => import('@/pages/Login'));
const Register = asyncComponent(() => import('@/pages/Register'));
const RegisterResult = asyncComponent(() => import('@/pages/RegisterResult'));

class UserRouters extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/user"
          render={() => <Redirect to="/user/login" push />}
        />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/user/register" component={Register} />
        <Route exact path="/user/register_result" component={RegisterResult} />
        <Route render={() => <Redirect to="/user/login" />} />
      </Switch>
    );
  }
}

export default UserRouters;
