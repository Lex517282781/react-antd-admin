import React, { Component } from 'react'; // , Fragment
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown
} from 'antd';
import { Bar } from '@/components/Charts';
import numeral from 'numeral';
import styles from './TrendPreview.less';
import { getTimeDistance } from '@/utils';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234
  });
}

const data = [
  {
    x: '1月',
    y: 342
  },
  {
    x: '2月',
    y: 1020
  },
  {
    x: '3月',
    y: 233
  },
  {
    x: '4月',
    y: 782
  },
  {
    x: '5月',
    y: 377
  },
  {
    x: '6月',
    y: 1121
  },
  {
    x: '7月',
    y: 548
  },
  {
    x: '8月',
    y: 670
  },
  {
    x: '9月',
    y: 827
  },
  {
    x: '10月',
    y: 1035
  },
  {
    x: '11月',
    y: 304
  },
  {
    x: '12月',
    y: 404
  }
];

class TrendPreview extends Component {
  constructor(props) {
    super(props);
    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: `title ${i}`,
        total: 323234
      });
    }
    this.state = {
      salesType: 'all',
      currentTabKey: '',
      loading: true,
      rangePickerValue: getTimeDistance('year')
    };
  }

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type)
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  render() {
    const { loading = false, salesData = data } = this.props;
    const { rangePickerValue } = this.state;

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a
            className={this.isActive('today')}
            onClick={() => this.selectDate('today')}
          >
            今日
          </a>
          <a
            className={this.isActive('week')}
            onClick={() => this.selectDate('week')}
          >
            本周
          </a>
          <a
            className={this.isActive('month')}
            onClick={() => this.selectDate('month')}
          >
            本月
          </a>
          <a
            className={this.isActive('year')}
            onClick={() => this.selectDate('year')}
          >
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    return (
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.salesCard}>
          <Tabs
            tabBarExtraContent={salesExtra}
            size="large"
            tabBarStyle={{ marginBottom: 24 }}
          >
            <TabPane tab={'销售额'} key="sales">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar height={295} title={'销售趋势'} data={salesData} />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                    <ul className={styles.rankingList}>
                      {this.rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span
                            className={`${styles.rankingItemNumber} ${
                              i < 3 ? styles.active : ''
                            }`}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={styles.rankingItemTitle}
                            title={item.title}
                          >
                            {item.title}
                          </span>
                          <span className={styles.rankingItemValue}>
                            {numeral(item.total).format('0,0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab={'访问量'} key="views">
              <Row>
                <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesBar}>
                    <Bar height={292} title={'访问量趋势'} data={salesData} />
                  </div>
                </Col>
                <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                  <div className={styles.salesRank}>
                    <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                    <ul className={styles.rankingList}>
                      {this.rankingListData.map((item, i) => (
                        <li key={item.title}>
                          <span className={i < 3 ? styles.active : ''}>
                            {i + 1}
                          </span>
                          <span>{item.title}</span>
                          <span>{numeral(item.total).format('0,0')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    );
  }
}

export default TrendPreview;
