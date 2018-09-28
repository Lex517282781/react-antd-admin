import React, { Component } from 'react';
import { Icon, Card, Radio, Menu, Dropdown } from 'antd';
import { Pie } from '@/components/Charts';
import { Yuan } from '@/utils';
import styles from './ProportionPreview.less';

const salesTypeList = [
  {
    x: '家用电器',
    y: 4544
  },
  {
    x: '食用酒水',
    y: 3321
  },
  {
    x: '个护健康',
    y: 3113
  },
  {
    x: '服饰箱包',
    y: 2341
  },
  {
    x: '母婴产品',
    y: 1231
  },
  {
    x: '其他',
    y: 1231
  }
];

const salesTypeDataOnlineData = [
  {
    x: '家用电器',
    y: 244
  },
  {
    x: '食用酒水',
    y: 321
  },
  {
    x: '个护健康',
    y: 311
  },
  {
    x: '服饰箱包',
    y: 41
  },
  {
    x: '母婴产品',
    y: 121
  },
  {
    x: '其他',
    y: 111
  }
];

const salesTypeDataOfflineData = [
  {
    x: '家用电器',
    y: 99
  },
  {
    x: '食用酒水',
    y: 188
  },
  {
    x: '个护健康',
    y: 344
  },
  {
    x: '服饰箱包',
    y: 255
  },
  {
    x: '其他',
    y: 65
  }
];

class ProportionPreview extends Component {
  state = {
    salesType: 'all'
  };

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value
    });
  };

  render() {
    const {
      loading = false,
      salesTypeData = salesTypeList,
      salesTypeDataOnline = salesTypeDataOnlineData,
      salesTypeDataOffline = salesTypeDataOfflineData
    } = this.props;

    const { salesType } = this.state;

    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData =
        salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }

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

    return (
      <Card
        loading={loading}
        className={styles.salesCard}
        bordered={false}
        title={'销售额类别占比'}
        bodyStyle={{ padding: 24 }}
        extra={
          <div className={styles.salesCardExtra}>
            {iconGroup}
            <div className={styles.salesTypeRadio}>
              <Radio.Group
                value={salesType}
                onChange={this.handleChangeSalesType}
              >
                <Radio.Button value="all">全部渠道</Radio.Button>
                <Radio.Button value="online">线上</Radio.Button>
                <Radio.Button value="stores">门店</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        }
        style={{ marginTop: 24, minHeight: 509 }}
      >
        <h4 style={{ marginTop: 8, marginBottom: 32 }}>销售额</h4>
        <Pie
          hasLegend
          subTitle={'销售额'}
          total={() => (
            <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>
          )}
          data={salesPieData}
          valueFormat={value => <Yuan>{value}</Yuan>}
          height={248}
          lineWidth={4}
        />
      </Card>
    );
  }
}

export default ProportionPreview;
