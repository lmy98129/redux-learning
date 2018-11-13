import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grid.css'
import { Modal } from 'antd-mobile'
import { mapStateToProps, mapDispatchToProps } from '../redux/modules/schedule'
import { connect } from 'react-redux'

const operation = Modal.operation;

class Grid extends Component {
  render() {
    const { content, schedule, addCourse, deleteCourse, time, date } = this.props;
    if (content.length === 0) {
      return (<td className="course-table-grid" onClick={() => operation([
        { text: '添加课程', onPress: () => addCourse(schedule, time, date) },
      ])}></td>)
    } else {
      return(
        <td className="course-table-grid" onClick={() => operation([
          { text: '课程信息', onPress: () => console.log('标为未读被点击了') },
          { text: '添加课程', onPress: () => addCourse(schedule, time, date) },
          { text: '编辑课程', onPress: () => console.log('置顶聊天被点击了') },
          { text: '删除课程', onPress: () => deleteCourse(schedule, time, date) },
        ])}>
          <div className="course-table-grid-content-wrapper"  style={{background:content[0].color}}>
            <div className="course-table-grid-content">
              <div className="content-upper">{ content[0].courseName }<br/></div>
              <div className="content-lower">
                <div className="content-classroom"> { '@'+content[0]["classroom.roomNickname"] }<br/></div>
                {
                  content.length > 1 ? (<div className="content-hint">点击展开</div>) : ""
                }
              </div>
            </div>
          </div>
        </td>
      )
    }
  } 
}

Grid.propTypes = {
  content: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);

