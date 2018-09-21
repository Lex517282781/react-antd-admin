import React, { Component } from 'react';
import Routes from '@/routes';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from './store/common';
import { actionCreators as sidebarActionCreators } from '@/components/SideBar/store';
import { ContainerQuery } from 'react-container-query';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import DocumentTitle from 'react-document-title';
import SideBar from './components/SideBar';
import HeadBar from './components/HeadBar';
import classNames from 'classnames';
import './App.less';
import styles from './App.less';

const { Sider, Content } = Layout;

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

  getPageTitle = pathname => {
    return 'pathname';
  };

  render() {
    const { collapsed } = this.props;
    const { isMobile } = this.state;

    const layout = (
      <Layout className={styles.App}>
        {!isMobile && (
          <Sider
            className={styles.sider}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className={styles.logo} />
            <SideBar />
          </Sider>
        )}

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
      <DocumentTitle title={this.getPageTitle('pathname')}>
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
