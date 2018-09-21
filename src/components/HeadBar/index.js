import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as headbarActionCreators } from './store';
import { actionCreators as sidebarActionCreators } from '@/components/SideBar/store';
import { Layout, Icon } from 'antd';
import styles from './style.less';

const { Header } = Layout;

class HeadBar extends Component {
  toggle = () => {
    const { collapsed, sidebar_update } = this.props;
    sidebar_update({
      collapsed: !collapsed
    });
  };

  render() {
    const { collapsed } = this.props;

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.common.menu,
  headbar: state.headbar,
  collapsed: state.sidebar.collapsed
});

const mapDispatchToProps = dispatch => ({
  headbar_update(data) {
    dispatch(headbarActionCreators.headbar_update(data));
  },
  sidebar_update(data) {
    dispatch(sidebarActionCreators.sidebar_update(data));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeadBar)
);
