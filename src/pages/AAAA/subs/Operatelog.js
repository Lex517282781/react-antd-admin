import React, { Component } from 'react';
import { Card, Badge, Table } from 'antd';
import styles from './Operatelog.less';

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一'
  },
  {
    key: 'tab2',
    tab: '操作日志二'
  },
  {
    key: 'tab3',
    tab: '操作日志三'
  }
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'agree' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="error" text="驳回" />
      )
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt'
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo'
  }
];

class Operatelog extends Component {
  state = {
    operationkey: 'tab1'
  };

  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  render() {
    const {
      advancedOperation1 = [],
      advancedOperation2 = [],
      advancedOperation3 = [],
      loading = false
    } = this.props;

    const { operationkey } = this.state;

    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      )
    };
    return (
      <Card
        className={styles.tabsCard}
        bordered={false}
        tabList={operationTabList}
        onTabChange={this.onOperationTabChange}
      >
        {contentList[operationkey]}
      </Card>
    );
  }
}

export default Operatelog;
