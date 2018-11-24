import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import { ActivityIndicator, Toast, Button } from 'antd-mobile'
import './CourseTable.css'
import Grid from './CourseGrid'

class CourseTable extends Component {
  constructor(props) {
    super(props);
    const { tableValue, getSchedule, checkLogin, userStatus, idNo, secrite, stuNo } = this.props;
    switch(userStatus) {
      case "Logged":
        switch(tableValue) {
          case "Success":
          case "Edited":
          case "Change Week":
          case "Failed":
            break;
          default:
            let userInfo = { idNo, secrite, stuNo };
            getSchedule(userInfo);
            break;
        }
        break;
      default:
        checkLogin();
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tableValue, getSchedule, userStatus, idNo, secrite, stuNo } = nextProps;
    switch(userStatus) {
      case "Logged":
        switch(tableValue) {
          case "Success":
          case "Edited":
          case "Change Week":
            break;
          case "Failed":
            Toast.fail("加载失败", 3);
            break;
          default:
            let userInfo = { idNo, secrite, stuNo };
            getSchedule(userInfo);
            break;
        }
        break;
      case "Failed":
        Toast.fail("登录失败", 3);        
        break;
    }
  }
  render() {
    const { tableValue, courseTable, history, userStatus } = this.props;
    switch(userStatus) {
      case "Unlogin":
        return (
          <div className="loading-status">
            欢迎使用 iCourse课表<br/><br/>
            <Button 
              type="ghost" 
              inline 
              style={{margin: "0 auto"}}
              onClick={() => history.push('/login')}
            >
              点我登录
            </Button>
          </div>
        )
    }
    switch(tableValue) {
      case "Loading":
        return (  
          <div className="loading-status">
            <ActivityIndicator 
              toast
              text="加载中"
              animating
            />
          </div>
        )
      case "Failed":
        return (
          <div className="loading-status">
            数据加载失败<br/><br/>请检查您的网络
          </div>
        )
      default:
        return (
          <table className="course-table">
            <thead>
              <tr className="course-table-head">
                <th></th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
                <th>周日</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(courseTable).map((time) => {
                  return (
                    <tr key={'tr_'+ time} className="course-table-line">
                      <th className="course-table-left-side">
                        {time}
                        <br/>
                        {timeRange[time].start}
                        <br/>
                        |
                        <br/>
                        {timeRange[time].end}
                      </th>
                      {
                        Object.keys(courseTable[time]).map((date) => {
                          return (
                            <Grid key={'th_'+date} time={time} date={date} history={history}/>
                          )
                        })
                      }
                    </tr>
                    )
                })
              }
            </tbody>
          </table>
        )
    }
  }
}

CourseTable.propTypes = {
  tableValue: PropTypes.string.isRequired,
  courseTable: PropTypes.object,
  getSchedule: PropTypes.func.isRequired,
}

const timeRange = {
  1: {
    start: "8:00",
    end: "9:35"
  },
  2: {
    start: "9:55",
    end: "11:30"
  },
  3: {
    start: "13:30",
    end: "15:05"
  },
  4: {
    start: "15:20",
    end: "16:55"
  },
  5: {
    start: "17:10",
    end: "18:45"
  },
  6: {
    start: "19:30",
    end: "21:05"
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseTable);

