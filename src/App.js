import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppRouters from '@/routes/AppRouters';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from './store/common';
import { actionCreators as sidebarActionCreators } from '@/layouts/SideBar/store';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import DocumentTitle from 'react-document-title';
import SideBar from './layouts/SideBar';
import HeadBar from './layouts/HeadBar';
import Footer from './layouts/Footer';
import classNames from 'classnames';
import zhMessages from '@/locales/zh-CN';
import store from 'store';
import styles from './App.less';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
};

class App extends Component {
  componentWillMount() {
    const user = store.get('react_antd_admin_user');
    if (user && user.status === 'ok') {
      return this.props.user_login_success(user);
    }
  }

  componentDidMount() {
    const { device_update, isMobile } = this.props;
    this.enquireHandler = enquireScreen(mobile => {
      if (isMobile !== mobile) {
        device_update({
          isMobile: mobile
        });
      }
    });
  }

  componentDidUpdate() {
    const { isMobile, collapsed } = this.props;
    if (isMobile && !collapsed) {
      this.handleCollapse(false);
    }
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  handleCollapse = collapsed => {
    const { sidebar_update } = this.props;
    sidebar_update({
      collapsed
    });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;

    const user = store.get('react_antd_admin_user');

    if (!user || user.status !== 'ok') {
      return <Redirect to="/user/login" />;
    }

    const lastPathname = pathname.slice(pathname.lastIndexOf('/') + 1);

    const layout = (
      <Layout className={styles.App}>
        <SideBar />
        <Layout>
          <HeadBar />
          <Content style={{ margin: '24px 24px 0' }}>
            <AppRouters />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={zhMessages[`menu.${lastPathname}`] || lastPathname}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.sidebar.collapsed,
  isMobile: state.common.device.isMobile,
  user: state.common.user.data
});

const mapDispatchToProps = dispatch => ({
  device_update(data) {
    dispatch(commonActionCreators.device_update(data));
  },
  sidebar_update(data) {
    dispatch(sidebarActionCreators.sidebar_update(data));
  },
  user_login_success(data) {
    dispatch(commonActionCreators.user_login_success(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
