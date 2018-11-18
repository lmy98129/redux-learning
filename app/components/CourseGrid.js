import React from 'react'
import PropTypes from 'prop-types'
import './CourseGrid.css'
import { Modal } from 'antd-mobile'
import { mapStateToProps, mapDispatchToProps } from '../redux/modules'
import { connect } from 'react-redux'

const operation = Modal.operation;

const CourseGrid = ({
    courseTable, 
    routerHistory,
    forwardPush,
    time, 
    date,
    history,
    schoolWeek,
    showAll,
  }) => {
    const content = courseTable[time][date];

    let targetGrid = (<td className="course-table-grid" onClick={() => operation([
      { text: '添加课程', onPress: () => {
        forwardPush(routerHistory, { pathname: '/edit', editStatus: 'add', time, date });
        history.push('/edit');
      } }
    ])}></td>)

    if (content.length === 0) {
      return targetGrid;
    } else {
      let filteredLength = 0, top;
      for (let i=0; i<content.length; i++) {
        let weekArr = content[i].weeks.split("")
        if (weekArr[schoolWeek-1] == "2" || showAll) {
          filteredLength++;
          if (top == undefined)
            top = i;
        }
      }
      if (top != undefined) {
        targetGrid = 
          ( <td className="course-table-grid" onClick={() => {
              forwardPush(routerHistory, { pathname: '/info', time, date });
              history.push('/info');
            }}>
              <div className="course-table-grid-content-wrapper"  style={{background:content[top].color}}>
                <div className="course-table-grid-content">
                  <div className="content-upper">{ content[top].courseName }<br/></div>
                  <div className="content-lower">
                    <div className="content-classroom"> { '@'+content[top]["classroom.roomNickname"] }<br/></div>
                    {
                      filteredLength > 1 ? (<div className="content-hint">点击展开</div>) : ""
                    }
                  </div>
                </div>
              </div>
            </td>
          )
      }
      return targetGrid;
    }
  }

CourseGrid.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseGrid);

