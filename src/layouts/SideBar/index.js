import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as sidebarActionCreators } from './store';
// import { Drawer } from 'antd';
import SiderMenu from './subs/SiderMenu';

class SideBar extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return <SiderMenu />;
  }
}

const mapStateToProps = state => ({
  menu: state.common.menu,
  sidebar: state.sidebar
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
