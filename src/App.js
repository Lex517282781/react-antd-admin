import React, { Component } from 'react';
import Routes from '@/routes';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from './store/common';
import { actionCreators as sidebarActionCreators } from '@/layouts/SideBar/store';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import DocumentTitle from 'react-document-title';
import SideBar from './layouts/SideBar';
import HeadBar from './layouts/HeadBar';
import classNames from 'classnames';
import zhMessages from '@/locales/zh-CN';
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
  state = {
    isMobile: false
  };

  componentDidMount() {
    const { menu_update } = this.props;
    menu_update();
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  handleCollapse = () => {
    const { collapsed, sidebar_update } = this.props;
    sidebar_update({
      collapsed: !collapsed
    });
  };

  render() {
    const {
      location: { pathname }
    } = this.props;
    const { isMobile } = this.state;

    const lastPathname = pathname.slice(pathname.lastIndexOf('/') + 1);

    const layout = (
      <Layout className={styles.App}>
        {!isMobile && <SideBar />}
        <Layout>
          <HeadBar />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={zhMessages[`menu.${lastPathname}`]}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  collapsed: state.sidebar.collapsed
});

const mapDispatchToProps = dispatch => ({
  menu_update(data) {
    dispatch(commonActionCreators.menu_update(data));
  },
  sidebar_update(data) {
    dispatch(sidebarActionCreators.sidebar_update(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
