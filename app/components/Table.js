import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/schedule'
import './Table.css'
import Grid from './Grid'

class Table extends Component {
  componentDidMount() {
    const { getValue } = this.props;
    getValue();
  }
  render() {
    const { value, payload } = this.props;
    let arr = [];
    for(let i=0; i<6; i++) {
      arr.push("");
    }
    if (value !== "Success") {
      return (  
        <div className="loading-status">{value}</div>
      )
    } else {
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
              Object.keys(payload).map((time) => {
                return (
                  <tr key={'ul_'+ time} className="course-table-line">
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
                      Object.keys(payload[time]).map((date) => {
                        return (
                          <Grid content={payload[time][date]} key={'li_'+date}/>
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

Table.propTypes = {
  value: PropTypes.string.isRequired
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
)(Table);

