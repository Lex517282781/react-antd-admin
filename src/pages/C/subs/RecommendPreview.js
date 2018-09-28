import React, { Component } from 'react'; // , Fragment
import { Row, Col, Icon, Card, Table, Tooltip, Menu, Dropdown } from 'antd';
import { MiniArea } from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import styles from './RecommendPreview.less';

const data = [
  {
    x: '2018-09-28',
    y: 1
  },
  {
    x: '2018-09-29',
    y: 6
  },
  {
    x: '2018-09-30',
    y: 4
  },
  {
    x: '2018-10-01',
    y: 8
  },
  {
    x: '2018-10-02',
    y: 3
  },
  {
    x: '2018-10-03',
    y: 7
  },
  {
    x: '2018-10-04',
    y: 2
  }
];

const sData = [
  {
    index: 1,
    keyword: '搜索关键词-0',
    count: 457,
    range: 56,
    status: 0
  },
  {
    index: 2,
    keyword: '搜索关键词-1',
    count: 510,
    range: 50,
    status: 0
  },
  {
    index: 3,
    keyword: '搜索关键词-2',
    count: 534,
    range: 51,
    status: 1
  },
  {
    index: 4,
    keyword: '搜索关键词-3',
    count: 678,
    range: 20,
    status: 1
  },
  {
    index: 5,
    keyword: '搜索关键词-4',
    count: 208,
    range: 21,
    status: 0
  },
  {
    index: 6,
    keyword: '搜索关键词-5',
    count: 526,
    range: 27,
    status: 1
  },
  {
    index: 7,
    keyword: '搜索关键词-6',
    count: 860,
    range: 7,
    status: 0
  },
  {
    index: 8,
    keyword: '搜索关键词-7',
    count: 281,
    range: 92,
    status: 0
  },
  {
    index: 9,
    keyword: '搜索关键词-8',
    count: 274,
    range: 32,
    status: 1
  },
  {
    index: 10,
    keyword: '搜索关键词-9',
    count: 518,
    range: 50,
    status: 0
  },
  {
    index: 11,
    keyword: '搜索关键词-10',
    count: 50,
    range: 15,
    status: 0
  },
  {
    index: 12,
    keyword: '搜索关键词-11',
    count: 698,
    range: 6,
    status: 0
  },
  {
    index: 13,
    keyword: '搜索关键词-12',
    count: 366,
    range: 73,
    status: 0
  },
  {
    index: 14,
    keyword: '搜索关键词-13',
    count: 487,
    range: 99,
    status: 0
  },
  {
    index: 15,
    keyword: '搜索关键词-14',
    count: 154,
    range: 20,
    status: 0
  },
  {
    index: 16,
    keyword: '搜索关键词-15',
    count: 21,
    range: 19,
    status: 1
  },
  {
    index: 17,
    keyword: '搜索关键词-16',
    count: 463,
    range: 55,
    status: 1
  },
  {
    index: 18,
    keyword: '搜索关键词-17',
    count: 36,
    range: 58,
    status: 0
  },
  {
    index: 19,
    keyword: '搜索关键词-18',
    count: 273,
    range: 48,
    status: 1
  },
  {
    index: 20,
    keyword: '搜索关键词-19',
    count: 772,
    range: 61,
    status: 1
  },
  {
    index: 21,
    keyword: '搜索关键词-20',
    count: 714,
    range: 29,
    status: 1
  },
  {
    index: 22,
    keyword: '搜索关键词-21',
    count: 285,
    range: 27,
    status: 0
  },
  {
    index: 23,
    keyword: '搜索关键词-22',
    count: 97,
    range: 51,
    status: 0
  },
  {
    index: 24,
    keyword: '搜索关键词-23',
    count: 82,
    range: 35,
    status: 0
  },
  {
    index: 25,
    keyword: '搜索关键词-24',
    count: 92,
    range: 63,
    status: 0
  },
  {
    index: 26,
    keyword: '搜索关键词-25',
    count: 817,
    range: 9,
    status: 0
  },
  {
    index: 27,
    keyword: '搜索关键词-26',
    count: 811,
    range: 27,
    status: 0
  },
  {
    index: 28,
    keyword: '搜索关键词-27',
    count: 470,
    range: 91,
    status: 1
  },
  {
    index: 29,
    keyword: '搜索关键词-28',
    count: 666,
    range: 41,
    status: 0
  },
  {
    index: 30,
    keyword: '搜索关键词-29',
    count: 134,
    range: 41,
    status: 1
  },
  {
    index: 31,
    keyword: '搜索关键词-30',
    count: 427,
    range: 32,
    status: 0
  },
  {
    index: 32,
    keyword: '搜索关键词-31',
    count: 365,
    range: 67,
    status: 1
  },
  {
    index: 33,
    keyword: '搜索关键词-32',
    count: 354,
    range: 70,
    status: 1
  },
  {
    index: 34,
    keyword: '搜索关键词-33',
    count: 36,
    range: 69,
    status: 1
  },
  {
    index: 35,
    keyword: '搜索关键词-34',
    count: 884,
    range: 54,
    status: 0
  },
  {
    index: 36,
    keyword: '搜索关键词-35',
    count: 451,
    range: 91,
    status: 0
  },
  {
    index: 37,
    keyword: '搜索关键词-36',
    count: 146,
    range: 85,
    status: 0
  },
  {
    index: 38,
    keyword: '搜索关键词-37',
    count: 110,
    range: 70,
    status: 1
  },
  {
    index: 39,
    keyword: '搜索关键词-38',
    count: 450,
    range: 98,
    status: 0
  },
  {
    index: 40,
    keyword: '搜索关键词-39',
    count: 746,
    range: 56,
    status: 1
  },
  {
    index: 41,
    keyword: '搜索关键词-40',
    count: 592,
    range: 49,
    status: 0
  },
  {
    index: 42,
    keyword: '搜索关键词-41',
    count: 757,
    range: 45,
    status: 0
  },
  {
    index: 43,
    keyword: '搜索关键词-42',
    count: 239,
    range: 76,
    status: 0
  },
  {
    index: 44,
    keyword: '搜索关键词-43',
    count: 107,
    range: 23,
    status: 0
  },
  {
    index: 45,
    keyword: '搜索关键词-44',
    count: 721,
    range: 44,
    status: 1
  },
  {
    index: 46,
    keyword: '搜索关键词-45',
    count: 453,
    range: 84,
    status: 1
  },
  {
    index: 47,
    keyword: '搜索关键词-46',
    count: 176,
    range: 69,
    status: 1
  },
  {
    index: 48,
    keyword: '搜索关键词-47',
    count: 727,
    range: 0,
    status: 1
  },
  {
    index: 49,
    keyword: '搜索关键词-48',
    count: 365,
    range: 55,
    status: 1
  },
  {
    index: 50,
    keyword: '搜索关键词-49',
    count: 773,
    range: 1,
    status: 1
  }
];

class RecommendPreview extends Component {
  render() {
    const {
      searchData = sData,
      loading = false,
      visitData2 = data
    } = this.props;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index'
      },
      {
        title: '搜索关键词',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>
      },
      {
        title: '用户数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right'
      }
    ];

    return (
      <Card
        loading={loading}
        bordered={false}
        title={'线上热门搜索'}
        extra={iconGroup}
        style={{ marginTop: 24 }}
      >
        <Row gutter={68}>
          <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
            <NumberInfo
              subTitle={
                <span>
                  搜索用户数
                  <Tooltip title={'指标说明'}>
                    <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                  </Tooltip>
                </span>
              }
              gap={8}
              total={numeral(12321).format('0,0')}
              status="up"
              subTotal={17.1}
            />
            <MiniArea line height={45} data={visitData2} />
          </Col>
          <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
            <NumberInfo
              subTitle={'人均搜索次数'}
              total={2.7}
              status="down"
              subTotal={26.2}
              gap={8}
            />
            <MiniArea line height={45} data={visitData2} />
          </Col>
        </Row>
        <Table
          rowKey={record => record.index}
          size="small"
          columns={columns}
          dataSource={searchData}
          pagination={{
            style: { marginBottom: 0 },
            pageSize: 5
          }}
        />
      </Card>
    );
  }
}

export default RecommendPreview;
