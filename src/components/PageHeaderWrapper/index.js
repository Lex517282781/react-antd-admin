import React, { Component } from 'react';
import PageHeader from '@/components/PageHeader';
import styles from './style.less';

class PageHeaderWrapper extends Component {
  render() {
    const { children, ...restProps } = this.props;
    return (
      <div style={{ margin: '-24px -24px 0' }}>
        <div>
          <PageHeader {...restProps} />
        </div>
        <div className={styles.content}>{children ? children : null}</div>
      </div>
    );
  }
}

export default PageHeaderWrapper;
