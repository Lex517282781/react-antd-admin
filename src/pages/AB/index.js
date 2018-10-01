import React, { Component } from 'react';
import { Button, Form, Icon, Popover } from 'antd';
import { connect } from 'react-redux';
import { actionCreators as aabActionCreators } from './store';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FooterToolbar from '@/components/FooterToolbar';
import Card1 from './subs/Card_1';
import Card2 from './subs/Card_2';
import Card3 from './subs/Card_3';
import styles from './style.less';

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
};

class AB extends Component {
  state = {
    width: '100%'
  };

  getErrorInfo = () => {
    const {
      form: { getFieldsError }
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      return (
        <li
          key={key}
          className={styles.errorListItem}
          onClick={() => scrollToField(key)}
        >
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errors[key][0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll }
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        console.log(values, 'values');
      }
    });
  };

  render() {
    const { form } = this.props;
    const { width } = this.state;

    return (
      <PageHeaderWrapper
        title="高级表单"
        content="高级表单常见于一次性输入和提交大批量数据的场景。"
        wrapperClassName={styles.advancedForm}
      >
        <Card1 form={form} fieldLabels={fieldLabels} />
        <Card2 form={form} fieldLabels={fieldLabels} />
        <Card3 form={form} />
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={false}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = state => ({
  table: state.aab.table,
  current: state.aab.current,
  selectedRows: state.aab.selectedRows
});

const mapDispatchToProps = dispatch => ({
  table_update(query) {
    dispatch(aabActionCreators.table_update(query));
  },
  current_update(data) {
    dispatch(aabActionCreators.current_update(data));
  },
  updateForm_update(data) {
    dispatch(aabActionCreators.updateForm_update(data));
  },
  createForm_update(data) {
    dispatch(aabActionCreators.createForm_update(data));
  },
  slectedRows_update(data) {
    dispatch(aabActionCreators.slectedRows_update(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AB));
