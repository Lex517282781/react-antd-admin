import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import UserRouters from '@/routes/UserRouters';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import logo from '@/assets/imgs/logo.svg';
import styles from './User.less';

const links = [
  {
    key: 'help',
    title: '帮助',
    href: ''
  },
  {
    key: 'privacy',
    title: '隐私',
    href: ''
  },
  {
    key: 'terms',
    title: '条款',
    href: ''
  }
];

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
  </Fragment>
);

class User extends React.PureComponent {
  render() {
    // const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>Ant Design</span>
              </Link>
            </div>
            <div className={styles.desc}>
              Ant Design 是西湖区最具影响力的 Web 设计规范
            </div>
          </div>
          <UserRouters />
        </div>
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    );
  }
}

export default User;
