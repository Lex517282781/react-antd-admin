import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RegisterResult from '@/pages/RegisterResult';

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
