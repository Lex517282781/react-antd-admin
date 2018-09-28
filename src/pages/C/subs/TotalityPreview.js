import React, { Component } from 'react'; // , Fragment
import { Row, Col, Icon, Tooltip } from 'antd';
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress
} from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import { Yuan } from '@/utils';
import styles from './TotalityPreview.less';

const data = [
  {
    x: '2018-09-28',
    y: 7
  },
  {
    x: '2018-09-29',
    y: 5
  },
  {
    x: '2018-09-30',
    y: 4
  },
  {
    x: '2018-10-01',
    y: 2
  },
  {
    x: '2018-10-02',
    y: 4
  },
  {
    x: '2018-10-03',
    y: 7
  },
  {
    x: '2018-10-04',
    y: 5
  },
  {
    x: '2018-10-05',
    y: 6
  },
  {
    x: '2018-10-06',
    y: 5
  },
  {
    x: '2018-10-07',
    y: 9
  },
  {
    x: '2018-10-08',
    y: 6
  },
  {
    x: '2018-10-09',
    y: 3
  },
  {
    x: '2018-10-10',
    y: 1
  },
  {
    x: '2018-10-11',
    y: 5
  },
  {
    x: '2018-10-12',
    y: 3
  },
  {
    x: '2018-10-13',
    y: 6
  },
  {
    x: '2018-10-14',
    y: 5
  }
];

class TotalityPreview extends Component {
  render() {
    const { loading = false, visitData = data } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 }
    };

    return (
      <Row gutter={24}>
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title={'总销售额'}
            action={
              <Tooltip title={'指标说明'}>
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            loading={loading}
            total={() => <Yuan>126560</Yuan>}
            footer={
              <Field
                label={'日销售额'}
                value={`￥${numeral(12423).format('0,0')}`}
              />
            }
            contentHeight={46}
          >
            <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={'访问量'}
            action={
              <Tooltip title={'指标说明'}>
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={numeral(8846).format('0,0')}
            footer={
              <Field label={'日访问量'} value={numeral(1234).format('0,0')} />
            }
            contentHeight={46}
          >
            <MiniArea color="#975FE4" data={visitData} />
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            loading={loading}
            title={'支付笔数'}
            action={
              <Tooltip title={'指标说明'}>
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total={numeral(6560).format('0,0')}
            footer={<Field label={'转化率'} value="60%" />}
            contentHeight={46}
          >
            <MiniBar data={visitData} />
          </ChartCard>
        </Col>

        <Col {...topColResponsiveProps}>
          <ChartCard
            loading={loading}
            bordered={false}
            title={'运营活动效果'}
            action={
              <Tooltip title={'指标说明'}>
                <Icon type="info-circle-o" />
              </Tooltip>
            }
            total="78%"
            footer={
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Trend flag="up" style={{ marginRight: 16 }}>
                  周同比
                  <span className={styles.trendText}>12%</span>
                </Trend>
                <Trend flag="down">
                  日同比
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress
              percent={78}
              strokeWidth={8}
              target={80}
              color="#13C2C2"
            />
          </ChartCard>
        </Col>
      </Row>
    );
  }
}

export default TotalityPreview;
