import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as aabActionCreators } from '../store';
import { Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;

class CreateForm extends Component {
  state = {
    modalVisible: false
  };

  handleok = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      this.handleAdd(fieldsValue);
    });
  };

  handleAdd = fields => {
    console.log(fields, 'fields create');
    message.success('添加成功');
    this.handleModalVisible();
  };

  handleModalVisible = () => {
    this.props.createForm_update({
      visible: false
    });
  };

  render() {
    const { form, createForm } = this.props;

    return (
      <Modal
        destroyOnClose
        title="新建规则"
        visible={createForm.visible}
        onOk={this.handleok}
        onCancel={this.handleModalVisible}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('desc', {
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5
              }
            ]
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  table: state.aab.table,
  createForm: state.aab.createForm,
  current: state.aab.current
});

const mapDispatchToProps = dispatch => ({
  table_update(query) {
    dispatch(aabActionCreators.table_update(query));
  },
  current_update(data) {
    dispatch(aabActionCreators.current_update(data));
  },
  createForm_update(data) {
    dispatch(aabActionCreators.createForm_update(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(CreateForm));
