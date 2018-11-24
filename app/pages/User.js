import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'
import TabBar from '../components/TabBar'
import { List, WhiteSpace, Button, WingBlank, ActivityIndicator, Modal, Toast } from 'antd-mobile'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import { connect } from 'react-redux'
import './User.css'

const Item = List.Item;
const alert = Modal.alert;

class User extends Component {
  constructor(props) {
    super(props);
    const { userProfileStatus, userStatus, checkLogin, getUserProfile } = this.props;
    switch(userStatus) {
      case "Logged":
        switch(userProfileStatus) {
          case "Success":
          case "Failed":
            break;
          case "Init":
            getUserProfile();
        }
        break;
      default:
        checkLogin();
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userProfileStatus, getUserProfile, userStatus } = nextProps;
    switch(userStatus) {
      case "Logged":
        switch(userProfileStatus) {
          case "Success":
            break;
          case "Failed":
            Toast.fail("加载失败", 3);
            break;
          case "Init":
            getUserProfile();
        }
        break;
      case "Failed":
        Toast.fail("登录失败", 3);        
        break;
    }
  }

  render() {
    const { userStatus, history, quitLogin, userProfile, userProfileStatus } = this.props;
    let userItems;
    switch(userStatus) {
      case "Logged":
        userItems = (
          <Fragment>
            <List>
              <Item extra={userProfile.stuNo || ""}>学号</Item>
              <Item extra={userProfile.stuName || ""}>姓名</Item>
              <Item extra={userProfile.className || ""}>班级</Item>
            </List>
            <WhiteSpace size="lg"/>
            <List>
              <Item arrow="horizontal">关于 iCourse</Item>
            </List>
            <WhiteSpace size="lg"/>
            <WhiteSpace size="lg"/>
            <WingBlank size="lg">
              <Button 
                style={{color: "#e94f4f"}} 
                onClick={() => alert("提示", "确认退出登录？", [
                  { text: "取消", onPress: () => {}, style: "default" },
                  { text: "确定", onPress: () => quitLogin(), style: {color: "#e94f4f"}}
                ])}
              >
                退出登录
              </Button>
            </WingBlank>
          </Fragment>
        )
        break;
      default:
        userItems = (
          <div className="login-button">
            <List>
              <Item 
                arrow="horizontal"
                extra="点我登录"
                onClick={() => history.push('/login')}
              >
                您还未登录
              </Item>
            </List>
            <WhiteSpace size="lg"/>
            <List>
              <Item arrow="horizontal">关于 iCourse</Item>
            </List>
          </div>
        )
      break;
    }
    return (
      <TabBar history={history}>
        <NavBar
        icon={<div></div>}
        rightContent={<div></div>}
      >
        我的
      </NavBar>
        {userStatus == "Checking" || userProfileStatus == "Loading" ? 
          <ActivityIndicator 
              toast
              text="加载中"
              animating
            />
          : "" }
        <div className="avatar-wrapper" >
          <div className="iconfont icon-yonghu avatar"></div>
        </div>
        {userItems}
        <div className="bottom-holder"></div>
      </TabBar>
    ) 
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(User);