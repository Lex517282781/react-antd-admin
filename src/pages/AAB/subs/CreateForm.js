import React, { Component } from 'react';
import { Form, Input, Modal, message } from 'antd';

const FormItem = Form.Item;

@Form.create()
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
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc
      }
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag
    });
  };

  render() {
    const { modalVisible, form } = this.props;

    return (
      <Modal
        destroyOnClose
        title="新建规则"
        visible={modalVisible}
        onOk={this.handleok}
        onCancel={() => this.handleModalVisible()}
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

export default CreateForm;
