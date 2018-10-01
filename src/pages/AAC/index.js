import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { actionCreators as aacActionCreators } from './store';
import moment from 'moment';
import { Card, Icon, Button, Dropdown, Menu, Badge, Divider } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableQueryForm from './subs/TableQueryForm';
import CreateForm from './subs/CreateForm';
import UpdateForm from './subs/UpdateForm';

import styles from './style.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

class B extends Component {
  state = {
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {}
  };

  columns = [
    {
      title: '规则名称',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'desc'
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      align: 'right',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0
        },
        {
          text: status[1],
          value: 1
        },
        {
          text: status[2],
          value: 2
        },
        {
          text: status[3],
          value: 3
        }
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      }
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(record)}>配置</a>
          <Divider type="vertical" />
          <a>订阅警报</a>
        </Fragment>
      )
    }
  ];

  componentDidMount() {
    const { table_update } = this.props;
    table_update({
      page: 1
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { table_update } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    table_update({
      page: params
    });
  };

  handleMenuClick = e => {
    const { slectedRows_update, selectedRows } = this.props;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        console.log(selectedRows.map(row => row.key), 'selectedRows');
        slectedRows_update([]);
        // submit data callback selectedRows: []
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.props.slectedRows_update(rows);
  };

  handleUpdateModalVisible = record => {
    const { current_update, updateForm_update } = this.props;
    current_update(record);
    updateForm_update({
      visible: true
    });
  };

  handleModalVisible = () => {
    const { createForm_update } = this.props;
    createForm_update({
      visible: true
    });
  };

  handleTabChange = key => {
    const { tabActiveKey_update } = this.props;
    tabActiveKey_update(key);
  };

  render() {
    const tabList = [
      {
        key: '1',
        tab: '状态1'
      },
      {
        key: '2',
        tab: '状态2'
      },
      {
        key: '3',
        tab: '状态3'
      }
    ];

    const { table, current, selectedRows, tabActiveKey } = this.props;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper
        title="搜索列表"
        // content={mainSearch}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              <TableQueryForm />
            </div>
            <div className={styles.tableListOperator}>
              <Button
                icon="plus"
                type="primary"
                onClick={this.handleModalVisible}
              >
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={table.loading}
              data={table.data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm />
        {current.key !== undefined && <UpdateForm />}
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  table: state.aac.table,
  current: state.aac.current,
  selectedRows: state.aac.selectedRows,
  tabActiveKey: state.aac.tabActiveKey
});

const mapDispatchToProps = dispatch => ({
  table_update(query) {
    dispatch(aacActionCreators.table_update(query));
  },
  current_update(data) {
    dispatch(aacActionCreators.current_update(data));
  },
  updateForm_update(data) {
    dispatch(aacActionCreators.updateForm_update(data));
  },
  createForm_update(data) {
    dispatch(aacActionCreators.createForm_update(data));
  },
  slectedRows_update(data) {
    dispatch(aacActionCreators.slectedRows_update(data));
  },
  tabActiveKey_update(data) {
    dispatch(aacActionCreators.tabActiveKey_update(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(B);
