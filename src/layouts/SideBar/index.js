import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import SiderMenu from './subs/SiderMenu';

class SideBar extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    const { isMobile, sidebar, onCollapse } = this.props;
    // console.log(sidebar.collapsed, 'sidebar.collapsed');
    return isMobile ? (
      <Drawer
        visible={!sidebar.collapsed}
        closable={false}
        placement="left"
        onClose={() => onCollapse(true)}
        style={{
          padding: 0,
          height: '100vh'
        }}
      >
        <SiderMenu
          onCollapse={onCollapse}
          collapsed={isMobile ? false : sidebar.collapsed}
          openKeys={sidebar.openKeys}
        />
      </Drawer>
    ) : (
      <SiderMenu
        onCollapse={onCollapse}
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

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideBar)
);
