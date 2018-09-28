import React, { Component } from 'react'; // , Fragment
import {
  Row,
  Col
  // Icon,
  // Card,
  // Tabs,
  // Table,
  // Radio,
  // DatePicker,
  // Tooltip,
  // Menu,
  // Dropdown
} from 'antd';
import TotalityPreview from './subs/TotalityPreview';
import TrendPreview from './subs/TrendPreview';
import RecommendPreview from './subs/RecommendPreview';
import ProportionPreview from './subs/ProportionPreview';
import InvertPreview from './subs/InvertPreview';
import styles from './style.less';

class C extends Component {
  render() {
    return (
      <div className={styles.c}>
        <TotalityPreview />
        <TrendPreview />
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <RecommendPreview />
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <ProportionPreview />
          </Col>
        </Row>
        <InvertPreview />
      </div>
    );
  }
}

export default C;
