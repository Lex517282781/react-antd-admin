import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as aabActionCreators } from '../store';
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Modal,
  message,
  Steps,
  Radio
} from 'antd';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

const initData = {
  target: '0',
  template: '0',
  type: '1',
  time: '',
  frequency: 'month'
};

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 }
    };
  }

  handleNext = currentStep => {
    const { form, current, current_update } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, 'fieldsValue');
      const formVals = { ...current, ...fieldsValue };

      current_update(formVals);

      if (currentStep < 2) {
        this.forward();
      } else {
        this.handleUpdate(formVals);
      }
    });
  };

  backward = () => {
    const { updateForm_update, updateForm } = this.props;
    updateForm_update({
      currentStep: updateForm.currentStep - 1
    });
  };

  forward = () => {
    const { updateForm_update, updateForm } = this.props;
    updateForm_update({
      currentStep: updateForm.currentStep + 1
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="监控对象">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">表一</Option>
              <Option value="1">表二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="规则模板">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="规则类型">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type
          })(
            <RadioGroup>
              <Radio value="0">强</Radio>
              <Radio value="1">弱</Radio>
            </RadioGroup>
          )}
        </FormItem>
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }]
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency
          })(
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          )}
        </FormItem>
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入规则名称！' }],
          initialValue: formVals.name
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="规则描述">
        {form.getFieldDecorator('desc', {
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 5
            }
          ],
          initialValue: formVals.desc
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>
    ];
  };

  renderFooter = currentStep => {
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => this.handleUpdateModalVisible()}>
          取消
        </Button>,
        <Button
          key="forward"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          下一步
        </Button>
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={() => this.handleUpdateModalVisible()}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          完成
        </Button>
      ];
    }
    return [
      <Button key="cancel" onClick={() => this.handleUpdateModalVisible()}>
        取消
      </Button>,
      <Button
        key="forward"
        type="primary"
        onClick={() => this.handleNext(currentStep)}
      >
        下一步
      </Button>
    ];
  };

  handleUpdateModalVisible = () => {
    this.props.updateForm_update({
      visible: false,
      currentStep: 0
    });
  };

  handleUpdate = fields => {
    // const { dispatch } = this.props;
    console.log(fields, 1);
    // todo ?
    // dispatch({
    //   type: 'rule/update',
    //   payload: {
    //     name: fields.name,
    //     desc: fields.desc,
    //     key: fields.key
    //   }
    // });

    message.success('配置成功');
    this.props.updateForm_update({
      visible: false,
      currentStep: 0
    });
  };

  render() {
    const { updateForm, current } = this.props;
    const formVals = {
      name: current.name,
      desc: current.desc,
      key: current.key,
      ...initData
    };
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateForm.visible}
        footer={this.renderFooter(updateForm.currentStep)}
        onCancel={() => this.handleUpdateModalVisible()}
      >
        <Steps
          style={{ marginBottom: 28 }}
          size="small"
          current={updateForm.currentStep}
        >
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps>
        {this.renderContent(updateForm.currentStep, formVals)}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  table: state.aab.table,
  updateForm: state.aab.updateForm,
  current: state.aab.current
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UpdateForm));
