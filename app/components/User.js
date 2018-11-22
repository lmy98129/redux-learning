import React from 'react'
import NavBar from './NavBar'
import TabBar from './TabBar'
import { List, WhiteSpace, Button } from 'antd-mobile'
import './User.css'

const Item = List.Item;

const User = ({ history }) => {
  return (
    <TabBar history={history}>
      <NavBar
      icon={<div></div>}
      rightContent={<div></div>}
    >
      我的
    </NavBar>
      <div className="avatar-wrapper" >
        <div className="iconfont icon-yonghu avatar"></div>
      </div>
      <List>
        <Item extra="41624140">学号</Item>
        <Item extra="刘孟寅">姓名</Item>
        <Item extra="2016级计1602班">班级</Item>
      </List>
      <WhiteSpace size="lg"/>
      <List>
        <Item arrow="horizontal">关于 iCourse</Item>
      </List>
      <WhiteSpace size="lg"/>
      <WhiteSpace size="lg"/>
      <Button type="warning">退出登录</Button>
      <div className="bottom-holder"></div>
    </TabBar>
  ) 
}

export default User;