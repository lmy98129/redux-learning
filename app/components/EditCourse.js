import React, { Component, Fragment } from 'react'
import NavBar from './NavBar'
import { Redirect } from 'react-router-dom'
import { WhiteSpace, InputItem, List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/'
import { connect } from 'react-redux'

const inputTags = ['courseName', 'classroom', 'SKZCZFC', 'dateTime']

class EditCourse extends Component {
  constructor(props) {
    super(props);
    const { routerHistory, schedule } = this.props;
    let time, date, editStatus, index, content, teacher;
    if (routerHistory.length != 0) {
      for (let item of routerHistory) {
        if (item.pathname == "/edit") {
          time = item.time;
          date = item.date;
          editStatus = item.editStatus;
          if (editStatus == "edit") {
            index = item.index;
          }
        }
      }
      switch(editStatus) {
        case "edit":
          content = schedule[time][date][index]
          if (content.teacher) {
            teacher = content.teacher;
          } else {
            teacher = ""
          }
          break;
        case "add":
          content = {
            courseName: "",
            SKZCZFC: "",
            "classroom.roomNickname": ""
          }
          teacher = ""
          break;
        default:
          return;
      }
    }
    this.state = {
      time, date, index, content, teacher, editStatus
    }
  }
  render() {
    const { history, form, updateCourse, addCourse, schedule } = this.props
    const { getFieldProps, getFieldError, validateFields } = form
    const { time, date, index, content, teacher, editStatus } = this.state;
    if (!time || !date) {
      return <Redirect push to="/"/>
    }
    return (
      <Fragment>
        <NavBar 
          history={history} 
          rightContent={
            <div 
              onClick={() => validateFields({ force: true }, (error) => {
                if (!error) {
                  let fieldsValue = form.getFieldsValue();
                  fieldsValue["classroom.roomNickname"] = fieldsValue.classroom;
                  delete fieldsValue.classroom;
                  switch(editStatus) {
                    case "edit":
                      updateCourse(schedule, time, date, index, fieldsValue)
                      break;
                    case "add":
                      addCourse(schedule, time, date, fieldsValue)
                      break;
                  }
                  Toast.success("保存成功", 1);
                } else {
                  console.log(error);
                  Toast.fail("输入格式有误", 1);
                }
              })} 
              style={{marginRight: "15px"}}
            >完成</div>
          }
        >编辑课程</NavBar>
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
              {...getFieldProps('courseName', {
                rules: [
                  { required: true, message: "课程名称为空" }
                ],
                initialValue: content.courseName
              })}
              placeholder="请输入课程名称"
              clear
            >
              课程名称
            </InputItem>
            <InputItem
              {...getFieldProps("classroom", {
                rules: [
                  { required: true, message: "教室为空" }
                ],
                initialValue: content["classroom.roomNickname"]
              })}
              placeholder="请输入教室"
              clear
            >
              教室
            </InputItem>
            <InputItem
              {...getFieldProps('SKZCZFC', {
                rules: [
                  { required: true, message: "上课周数为空" }
                ],
                initialValue: content.SKZCZFC
              })}
              placeholder="请输入上课周数"
              clear
            >
              周数
            </InputItem>
            <InputItem
              {...getFieldProps('dateTime', {
                rules: [
                  { required: true, message: "上课节数为空" }
                ],
                initialValue: "周"+date+" 第"+time+"节"
              })}
              placeholder="请输入上课节数"
              clear
              // disabled
              editable={false}
            >
              节数
            </InputItem>
            <InputItem
              // {...getFieldProps('teacher', {})}
              placeholder="(暂不支持)"
              defaultValue={teacher}
              disabled
            >
              教师
            </InputItem>

          </List>
        </form>
      </Fragment>
    )
  }
}


export default 
  connect(
    mapStateToProps, 
    mapDispatchToProps
  )(createForm()(EditCourse));