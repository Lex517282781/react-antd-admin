import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb, Tabs, Skeleton } from 'antd';
import getBreadcrumbNameMap from '@/utils/getBreadcrumbNameMap';
import classNames from 'classnames';
import styles from './style.less';

const { TabPane } = Tabs;

class PageHeader extends Component {
  render() {
    const {
      title,
      logo,
      action,
      content,
      extraContent,
      tabList,
      className,
      tabActiveKey,
      tabDefaultActiveKey,
      tabBarExtraContent,
      loading = false,
      location,
      menu
    } = this.props;

    const clsString = classNames(styles.pageHeader, className);
    const activeKeyProps = {};
    if (tabDefaultActiveKey !== undefined) {
      activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
    }
    if (tabActiveKey !== undefined) {
      activeKeyProps.activeKey = tabActiveKey;
    }

    const key = location.pathname.substr(
      location.pathname.lastIndexOf('/') + 1
    );

    const routerMap = getBreadcrumbNameMap(menu.data);

    const currentRouterPath = routerMap[key].openKeys.concat(key);

    return (
      <div className={clsString}>
        <Skeleton
          loading={loading}
          title={false}
          active
          paragraph={{ rows: 3 }}
        >
          <Breadcrumb className={styles.breadcrumb}>
            {currentRouterPath.map(key => {
              return (
                <Breadcrumb.Item key={key}>
                  {routerMap[key].text}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>

          <div className={styles.detail}>
            {logo && <div className={styles.logo}>{logo}</div>}
            <div className={styles.main}>
              <div className={styles.row}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {action && <div className={styles.action}>{action}</div>}
              </div>
              <div className={styles.row}>
                {content && <div className={styles.content}>{content}</div>}
                {extraContent && (
                  <div className={styles.extraContent}>{extraContent}</div>
                )}
              </div>
            </div>
          </div>

          {tabList && tabList.length ? (
            <Tabs
              className={styles.tabs}
              {...activeKeyProps}
              onChange={this.onChange}
              tabBarExtraContent={tabBarExtraContent}
            >
              {tabList.map(item => (
                <TabPane tab={item.tab} key={item.key} />
              ))}
            </Tabs>
          ) : null}
        </Skeleton>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.common.menu,
  headbar: state.headbar,
  collapsed: state.sidebar.collapsed
});

export default withRouter(connect(mapStateToProps)(PageHeader));
