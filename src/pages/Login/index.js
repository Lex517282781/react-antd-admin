import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from '@/store/common';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import store from 'store';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.data.status === this.props.user.data.status) return;
    if (nextProps.user.data.status === 'ok') {
      store.set('react_antd_admin_user', nextProps.user.data);
      nextProps.history.replace('/app');
    }
  }

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/getCaptcha',
            payload: values.mobile
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    if (!err) {
      const { user_login } = this.props;
      user_login({
        values
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  renderMessage = content => (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { user } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {user.data.status === 'error' &&
              type === 'account' &&
              !user.loading &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name="userName" placeholder="admin/user" />
            <Password
              name="password"
              placeholder="888888/123456"
              onPressEnter={() =>
                this.loginForm.validateFields(this.handleSubmit)
              }
            />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {user.data.status === 'error' &&
              type === 'mobile' &&
              !user.loading &&
              this.renderMessage('验证码错误')}
            <Mobile name="mobile" />
            <Captcha
              name="captcha"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit loading={user.loading}>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon
              type="alipay-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Icon
              type="taobao-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Icon
              type="weibo-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Link className={styles.register} to="/user/register">
              注册账户
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.user
});

const mapDispatchToProps = dispatch => ({
  user_login(data) {
    dispatch(commonActionCreators.user_login(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
