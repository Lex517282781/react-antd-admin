import React, { Component, Fragment } from 'react';
import { Steps, Card, Popover, Icon, Badge } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import classNames from 'classnames';
import styles from './Process.less';

const { Step } = Steps;
const getWindowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth;

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge
        status="default"
        text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>}
      />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
  ) : (
    dot
  );

class Process extends Component {
  state = {
    stepDirection: 'horizontal'
  };

  componentDidMount() {
    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical'
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal'
      });
    }
  }

  render() {
    const { stepDirection } = this.state;

    return (
      <Card title="流程进度" style={{ marginBottom: 24 }} bordered={false}>
        <Steps direction={stepDirection} progressDot={customDot} current={1}>
          <Step title="创建项目" description={desc1} />
          <Step title="部门初审" description={desc2} />
          <Step title="财务复核" />
          <Step title="完成" />
        </Steps>
      </Card>
    );
  }
}

export default Process;
