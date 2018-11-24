import React, { Component, Fragment } from 'react'
import NavBar from '../components/NavBar'
import { connect } from 'react-redux'
import { List, InputItem, Toast, WhiteSpace, WingBlank, ActivityIndicator } from 'antd-mobile'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import { createForm } from 'rc-form'
import './Login.css'

const inputTags = ['idNo', 'secrite', 'stuNo'];

class Login extends Component {
  componentWillReceiveProps(nextProps) {
    const { userStatus } = nextProps;
    switch(userStatus) {
      case "Failed":
        Toast.fail(<div>登录失败<br/>请重新输入</div>, 2);
        break;
      case "Success":
        Toast.success("登录成功", 2);
        break;
    }
  }
  render() {
    const { history, form, commitLogin, userStatus } = this.props;
    const { getFieldProps, getFieldError, validateFields, getFieldsValue } = form;
    return (
      <Fragment>
        {
          userStatus == "Checking" ? 
          <ActivityIndicator 
              toast
              text="登录中"
              animating
            />
          : <div></div>
        }
        <NavBar
          history={history}
          rightContent={
            <div
              onClick={() => {
                validateFields({ force: true }, (error) => {
                  if (!error) {
                    let fieldsValue = getFieldsValue();
                    commitLogin(fieldsValue);
                  } else {
                    console.log(error);
                    Toast.fail("输入有误", 1);
                  }
                })
              }}
              style={{marginRight: "15px"}}
            >
              完成
            </div>
          }
        >
          用户登录
        </NavBar>
        <WhiteSpace size="lg"/>
        <form>
          <List 
            renderFooter={() => {
              for (let item of inputTags) {
                if (getFieldError(item) !== undefined) {
                  return getFieldError(item);
                }
              }
            }}
          >
            <InputItem
              {...getFieldProps('stuNo', {
                rules: [
                  { required: true, message: "学号为空" }
                ],
              })}
              placeholder="请输入学号"
              clear
            >
              学号
            </InputItem>
            <InputItem
              {...getFieldProps('idNo', {
                rules: [
                  { required: true, message: "身份证号为空" }
                ],
              })}
              placeholder="请输入身份证号"
              clear
            >
              身份证号
            </InputItem>
            <InputItem
              {...getFieldProps('secrite', {
                rules: [
                  { required: true, message: "信息门户密码为空" }
                ],
              })}
              placeholder="请输入信息门户密码"
              clear
              type="password"
            >
              密码
            </InputItem>
          </List>
        </form>
        <WingBlank size="lg">
          <div className="login-hint">1. 基于贝壳校园 <a href="http://student.bkthink.com">student.bkthink.com</a> 提供的接口数据，因此需要提供身份证号</div>
          <div className="login-hint">2. 身份信息仅用于登录、获取课表信息，不会用作其他用途，欢迎监督</div>
          <div className="login-hint">3. 信息门户密码默认为身份证号后6位</div>
        </WingBlank>
      </Fragment>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(Login));