import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { actionCreators as commonActionCreators } from '@/store/common'
import { Menu, Dropdown, Tag, Avatar, Icon, Tooltip } from 'antd'
import NoticeIcon from '@/components/NoticeIcon'
import moment from 'moment'
import { groupBy } from 'lodash'
import store from 'store'
import styles from './RightContent.less'

class RightContent extends Component {
  getNoticeData() {
    const { notices = [] } = this.props
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status]
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        )
      }
      return newNotice
    })
    return groupBy(newNotices, 'type')
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      store.remove('react_antd_admin_user')
      this.props.user_logout({
        status: 'error'
      })
      this.props.history.replace('/user/login');
    }
  }

  render() {
    const noticeData = this.getNoticeData()

    const menu = (
      <Menu
        className={styles.menu}
        selectedKeys={[]}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="userCenter">
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          个人设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <div className={styles.rightContent}>
        <Tooltip title="使用文档">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.action}
            title="使用文档"
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={10}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps) // eslint-disable-line
          }}
          onNoticeClear={this.handleNoticeClear}
          onNoticeVisibleChange={this.handleNoticeVisibleChange}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            list={noticeData['通知']}
            title="通知"
            emptyText="你已查看所有通知"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            list={noticeData['消息']}
            title="消息"
            emptyText="您已读完所有消息"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            list={noticeData['待办']}
            title="待办"
            emptyText="你已完成所有待办"
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
        <Dropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src={
                'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
              }
              alt="avatar"
            />
            <span className={styles.name}>{'nickname'}</span>
          </span>
        </Dropdown>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.common.user.data
})

const mapDispatchToProps = dispatch => ({
  user_logout(data) {
    dispatch(commonActionCreators.user_logout(data))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RightContent))