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
  }
  render() {
    const history = this.props.history
    const { backValue, editStatus } = history.location;
    const { getFieldProps, getFieldError, validateFields } = this.props.form
    if (!backValue) {
      return <Redirect push to="/"/>
    }
    let teacher, content, time, date, index;
    switch(editStatus) {
      case "edit":
        time = backValue.time;
        date = backValue.date;
        index = history.location.index;
        content = this.props.schedule[time][date][index]
        if (content.teacher) {
          teacher = content.teacher;
        } else {
          teacher = ""
        }
        break;
      case "add":
        time = history.location.time;
        date = history.location.date;
        content = {
          courseName: "",
          SKZCZFC: "",
          "classroom.roomNickname": ""
        }
        teacher = ""
        break;
    }
    return (
      <Fragment>
        <NavBar 
          history={history} 
          backValue={backValue} 
          rightContent={
            <div 
              onClick={() => validateFields({ force: true }, (error) => {
                if (!error) {
                  let fieldsValue = this.props.form.getFieldsValue();
                  fieldsValue["classroom.roomNickname"] = fieldsValue.classroom;
                  delete fieldsValue.classroom;
                  // delete fieldsValue.teacher;
                  console.log(fieldsValue);
                  switch(editStatus) {
                    case "edit":
                      this.props.updateCourse(this.props.schedule, time, date, index, fieldsValue)
                      break;
                    case "add":
                      this.props.addCourse(this.props.schedule, time, date, fieldsValue)
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