import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grid.css'
import { Modal } from 'antd-mobile'
import { mapStateToProps, mapDispatchToProps } from '../redux/modules'
import { connect } from 'react-redux'

const operation = Modal.operation;

const Grid = ({
    schedule, 
    routerHistory,
    forwardPush,
    time, 
    date,
    history
  }) => {
    const content = schedule[time][date];
    const currentHistory = history.location;
    if (content.length === 0) {
      return (<td className="course-table-grid" onClick={() => operation([
        { text: '添加课程', onPress: () => {
          // forwardPush(routerHistory, currentHistory);
          forwardPush(routerHistory, { pathname: '/edit', editStatus: 'add', time, date });
          history.push('/edit');
        } }
      ])}></td>)
    } else {
      return(
        <td className="course-table-grid" onClick={() => {
          // forwardPush(routerHistory, currentHistory);
          forwardPush(routerHistory, { pathname: '/info', time, date });
          history.push('/info');
        }}>
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

Grid.propTypes = {
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);

