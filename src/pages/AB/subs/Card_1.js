import React, { Component } from 'react';
import { Card, Col, Row, DatePicker, Input, Select, Form } from 'antd';
import styles from '../style.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

class Card1 extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      fieldLabels
    } = this.props;

    return (
      <Card title="仓库管理" className={styles.card} bordered={false}>
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label={fieldLabels.name}>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入仓库名称' }]
                })(<Input placeholder="请输入仓库名称" />)}
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 6, offset: 2 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              sm={24}
            >
              <Form.Item label={fieldLabels.url}>
                {getFieldDecorator('url', {
                  rules: [{ required: true, message: '请选择' }]
                })(
                  <Input
                    style={{ width: '100%' }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="请输入"
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
              <Form.Item label={fieldLabels.owner}>
                {getFieldDecorator('owner', {
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
              <Form.Item label={fieldLabels.approver}>
                {getFieldDecorator('approver', {
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
              <Form.Item label={fieldLabels.dateRange}>
                {getFieldDecorator('dateRange', {
                  rules: [{ required: true, message: '请选择生效日期' }]
                })(
                  <RangePicker
                    placeholder={['开始日期', '结束日期']}
                    style={{ width: '100%' }}
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
              <Form.Item label={fieldLabels.type}>
                {getFieldDecorator('type', {
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

export default Card1;
