import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grid.css'
import { Modal } from 'antd-mobile'

const operation = Modal.operation;

export default class Grid extends Component {
  componentDidMount() {
    const { addCourse, fullContent } = this.props;
  }
  render() {
    const { content } = this.props;
    if (content.length === 0) {
      return (<td className="course-table-grid" onClick={() => operation([
        { text: '添加课程', onPress: () => console.log('标为未读被点击了') },
      ])}></td>)
    } else {
      return(
        <td className="course-table-grid" onClick={() => operation([
          { text: '课程信息', onPress: () => console.log('标为未读被点击了') },
          { text: '编辑课程', onPress: () => console.log('置顶聊天被点击了') },
        ])}>
          <div className="course-table-grid-content-wrapper"  style={{background:content[0].color}}>
            <div className="course-table-grid-content">
              <div className="content-title">{ content[0].courseName }<br/></div>
              <div className="content-time"> { content[0].SKZCZFC }<br/></div>
              {
                content.length > 1 ? (<div className="content-hint">点击展开</div>) : ""
              }
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

