import React, { Component } from 'react';
import {
  Card,
  Form,
  Col,
  Row,
  TimePicker,
  Input,
  Select,
} from 'antd';
import styles from '../style.less';

const { Option } = Select;

class Card2 extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      fieldLabels
    } = this.props;

    return (
      <Card title="任务管理" className={styles.card} bordered={false}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.name2}>
                {getFieldDecorator('name2', {
                  rules: [{ required: true, message: '请输入' }]
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 6, offset: 2 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              sm={24}
            >
              <Form.Item label={fieldLabels.url2}>
                {getFieldDecorator('url2', {
                  rules: [{ required: true, message: '请选择' }]
                })(<Input placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 8, offset: 2 }}
              lg={{ span: 10 }}
              md={{ span: 24 }}
              sm={24}
            >
              <Form.Item label={fieldLabels.owner2}>
                {getFieldDecorator('owner2', {
                  rules: [{ required: true, message: '请选择管理员' }]
                })(
                  <Select placeholder="请选择管理员">
                    <Option value="xiao">付晓晓</Option>
                    <Option value="mao">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.approver2}>
                {getFieldDecorator('approver2', {
                  rules: [{ required: true, message: '请选择审批员' }]
                })(
                  <Select placeholder="请选择审批员">
                    <Option value="xiao">付晓晓</Option>
                    <Option value="mao">周毛毛</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 6, offset: 2 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              sm={24}
            >
              <Form.Item label={fieldLabels.dateRange2}>
                {getFieldDecorator('dateRange2', {
                  rules: [{ required: true, message: '请输入' }]
                })(
                  <TimePicker
                    placeholder="提醒时间"
                    style={{ width: '100%' }}
                    getPopupContainer={trigger => trigger.parentNode}
                  />
                )}
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 8, offset: 2 }}
              lg={{ span: 10 }}
              md={{ span: 24 }}
              sm={24}
            >
              <Form.Item label={fieldLabels.type2}>
                {getFieldDecorator('type2', {
                  rules: [{ required: true, message: '请选择仓库类型' }]
                })(
                  <Select placeholder="请选择仓库类型">
                    <Option value="private">私密</Option>
                    <Option value="public">公开</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default Card2;
