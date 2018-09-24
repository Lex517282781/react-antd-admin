import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as sidebarActionCreators } from '@/layouts/SideBar/store';
import { Drawer } from 'antd';
import SiderMenu from './subs/SiderMenu';

class SideBar extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  handleCollapse = collapsed => {
    const { sidebar_update } = this.props;
    sidebar_update({
      collapsed
    });
  };

  render() {
    const { isMobile, sidebar } = this.props;

    return isMobile ? (
      <Drawer
        visible={!sidebar.collapsed}
        closable={false}
        placement="left"
        onClose={() => this.handleCollapse(true)}
        style={{
          padding: 0,
          height: '100vh'
        }}
      >
        <SiderMenu
          onCollapse={this.handleCollapse}
          collapsed={isMobile ? false : sidebar.collapsed}
          openKeys={sidebar.openKeys}
        />
      </Drawer>
    ) : (
      <SiderMenu
        onCollapse={this.handleCollapse}
        collapsed={sidebar.collapsed}
        openKeys={sidebar.openKeys}
      />
    );
  }
}

const mapStateToProps = state => ({
  menu: state.common.menu,
  sidebar: state.sidebar,
  isMobile: state.common.device.isMobile
});

const mapDispatchToProps = dispatch => ({
  sidebar_update(data) {
    dispatch(sidebarActionCreators.sidebar_update(data));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar)
);
