import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'
import TabBar from '../components/TabBar'
import { List, WhiteSpace, Button, WingBlank, ActivityIndicator, Modal } from 'antd-mobile'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import { connect } from 'react-redux'
import './User.css'

const Item = List.Item;
const alert = Modal.alert;

class User extends Component {
  constructor(props) {
    super(props);
    const { checkLogin, userStatus } = this.props;
    if (userStatus !== "Logged") {
      checkLogin();
    } 
  }

  componentWillMount() {
    const { getUserProfile, userStatus } = this.props;
    getUserProfile(userStatus);
  }

  render() {
    const { userStatus, history, quitLogin, userProfile } = this.props;
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
        {userStatus == "checking" ? 
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