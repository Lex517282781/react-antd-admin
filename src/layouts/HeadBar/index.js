import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as sidebarActionCreators } from '@/layouts/SideBar/store';
import Debounce from 'lodash-decorators/debounce';
import { Layout, Icon } from 'antd';
import RightContent from './subs/RightContent';
import styles from './style.less';

const { Header } = Layout;

class HeadBar extends Component {
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }

  toggle = () => {
    const { collapsed, sidebar_update } = this.props;
    sidebar_update({
      collapsed: !collapsed
    });
    this.triggerResizeEvent();
  };

  render() {
    const { collapsed } = this.props;

    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <RightContent />
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
