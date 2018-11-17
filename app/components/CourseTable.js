import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import './CourseTable.css'
import Grid from './CourseGrid'

class CourseTable extends Component {
  constructor(props) {
    super(props);
    const { tableValue, getSchedule } = this.props;
    switch(tableValue) {
      case "Success":
      case "Edited":
        return;
    }
    getSchedule();
  }
  render() {
    const { tableValue, courseTable, history } = this.props;
    switch(tableValue) {
      case "Loading":
      case "Failed":
        return (  
          <div className="loading-status">{tableValue}</div>
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

