import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators as sidebarActionCreators } from '../store';
import { Menu, Icon, Layout } from 'antd';
import zhMessages from '@/locales/zh-CN';
import styles from './SiderMenu.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

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

  handleSelect = ({ item }) => {
    const { sidebar_update } = this.props;
    sidebar_update({
      openKeys: item.props.openKeys
    });
  }

  renderMenuItem = ({ text, icon, key }) => {
    return (
      <Menu.Item onClick={this.handleRouter} key={key}>
        {<Icon type={icon || ' '} />}
        <span>
          {zhMessages[`menu.${key}`]}
          {/* {text} */}
          {key}
        </span>
      </Menu.Item>
    );
  };

  renderGroupMenu = ({ key, text, group }) => (
    <MenuItemGroup key={key} title={zhMessages[`menu.${key}`]}>
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
            {zhMessages[`menu.${key}`]}
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

  handleCollapse = () => {
    const { sidebar, sidebar_update } = this.props;
    sidebar_update({
      collapsed: !sidebar.collapsed
    });
  };

  render() {
    const { menu, sidebar, location } = this.props;

    const key = location.pathname.substr(
      location.pathname.lastIndexOf('/') + 1
    );

    const keysProps = sidebar.collapsed ? {} : {
      openKeys: sidebar.openKeys || [],
      selectedKeys:[key]
    }

    // console.log(sidebar.openKeys, 'sidebar.openKeys')

    return (
      <Sider
        breakpoint="lg"
        width={256}
        className={styles.sider}
        trigger={null}
        collapsible
        collapsed={sidebar.collapsed}
        onCollapse={this.handleCollapse}
      >
        <div className={styles.logo} />
        <Menu
          inlineIndent="16"
          theme="dark"
          mode="inline"
          inlineCollapsed={sidebar.collapsed}
          onOpenChange={this.onOpenChange}
          onSelect={this.handleSelect}
          {...keysProps}
        >
          {menu.data.map(
            menuItem =>
              menuItem.children && menuItem.children.length
                ? this.renderSubMenu(menuItem)
                : this.renderMenuItem(menuItem)
          )}
        </Menu>
      </Sider>
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
