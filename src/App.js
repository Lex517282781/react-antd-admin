import React, { Component } from 'react';
import Routes from '@/routes';
import { Layout, Icon } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from './store/common';
import { actionCreators as sidebarActionCreators } from '@/components/SideBar/store';
import SideBar from './components/SideBar';
import './App.less';
import styles from './App.less';

const { Header, Sider, Content } = Layout;

class App extends Component {
  componentDidMount() {
    const { menu_update } = this.props;
    menu_update();
  }

  toggle = () => {
    const { collapsed, sidebar_update } = this.props;
    sidebar_update({
      collapsed: !collapsed
    });
  };

  render() {
    const { collapsed } = this.props;

    return (
      <Layout className={styles.App}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logo} />
          <SideBar />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
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
