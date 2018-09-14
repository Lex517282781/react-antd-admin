import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as sidebarActionCreators } from './store';
import './style.less';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SideBar extends Component {
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { location, menu: nextMenu } = nextProps;
    const { menu: prevMenu } = this.props;
    const path = location.pathname.substr(
      location.pathname.lastIndexOf('/') + 1
    );
    if (nextMenu.data[0]) {
      if (nextMenu !== prevMenu) {
        const currentKeyItem = this.getCurrentKey(nextMenu.data, path) || {};

        nextProps.sidebar_update({
          openKeys: currentKeyItem.openKeys || []
        });
      }
    }
  }

  handleRouter = ({ key }) => {
    const { history, location } = this.props;
    const currentKey = location.pathname.replace('/app/', '');
    if (currentKey === key) return;
    history.push(key);
  };

  onOpenChange = openKeys => {
    const { sidebar, menu, sidebar_update } = this.props;
    const rootSubmenuKeys = menu.data.map(item => item.key);
    const latestOpenKey = openKeys.find(
      key => sidebar.openKeys.indexOf(key) === -1
    );

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      sidebar_update({
        openKeys
      });
    } else {
      sidebar_update({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  renderMenuItem = ({ text, icon, key }) => {
    return (
      <Menu.Item onClick={this.handleRouter} key={key}>
        {<Icon type={icon || ' '} />}
        <span>
          {text}
          {key}
        </span>
      </Menu.Item>
    );
  };

  renderGroupMenu = ({ key, text, group }) => (
    <MenuItemGroup key={key} title={text}>
      {group.map(gitem => this.renderMenuItem(gitem))}
    </MenuItemGroup>
  );

  renderSubMenu = ({ text, icon, key, children }) => (
    <SubMenu
      key={key}
      title={
        <span>
          <Icon type={icon} />
          <span>
            {text}
            {key}
          </span>
        </span>
      }
    >
      {children.map(child => {
        if (child.children && child.children.length) {
          return this.renderSubMenu(child);
        } else if (child.group) {
          return this.renderGroupMenu(child);
        } else {
          return this.renderMenuItem(child);
        }
      })}
    </SubMenu>
  );

  getCurrentKey = (menu, key) => {
    let currentKey = null;
    const getKey = (menu, key) => {
      menu.forEach(item => {
        if (item.key === key) return (currentKey = item);
        if (item.children && item.children.length) {
          getKey(item.children, key);
        } else if (item.group && item.group.length) {
          getKey(item.group, key);
        }
      });
    };
    getKey(menu, key);
    return currentKey;
  };

  render() {
    const { menu, sidebar, location } = this.props;

    const key = location.pathname.substr(
      location.pathname.lastIndexOf('/') + 1
    );

    return (
      <Menu
        inlineIndent="16"
        theme="dark"
        mode="inline"
        inlineCollapsed={sidebar.collapsed}
        openKeys={sidebar.openKeys || []}
        onOpenChange={this.onOpenChange}
        selectedKeys={[key]}
      >
        {menu.data.map(
          menuItem =>
            menuItem.children && menuItem.children.length
              ? this.renderSubMenu(menuItem)
              : this.renderMenuItem(menuItem)
        )}
      </Menu>
    );
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
