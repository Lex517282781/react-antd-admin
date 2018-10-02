import React, { Component } from 'react';
import { Icon, Card } from 'antd';
import styles from './Record.less';

class Record extends Component {
  render() {
    return (
      <Card
        title="用户近半年来电记录"
        style={{ marginBottom: 24 }}
        bordered={false}
      >
        <div className={styles.noData}>
          <Icon type="frown-o" />
          暂无数据
        </div>
      </Card>
    );
  }
}

export default Record;
