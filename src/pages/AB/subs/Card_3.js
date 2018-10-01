import React, { Component } from 'react';
import { Card } from 'antd';
import TableForm from './TableForm';

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park'
  }
];

class Card3 extends Component {
  render() {
    const {
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Card title="成员管理" bordered={false}>
        {getFieldDecorator('members', {
          initialValue: tableData
        })(<TableForm />)}
      </Card>
    );
  }
}

export default Card3;
