import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps, scheduleGetter } from '../redux/modules/schedule'
import './Table.css'

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

class Table extends Component {
  componentDidMount() {
    const { getValue } = this.props;
    getValue();
  }
  render() {
    const { value, getValue, payload } = this.props;
    let arr = [];
    for(let i=0; i<6; i++) {
      arr.push("");
    }
    if (value !== "Success") {
      return (
        <div>
          <span>{value}</span>
          {/* <button onClick={getValue} className="load-btn">load table</button> */}
        </div>
      )
    } else {
      return (
        <div className="course-table-wrapper">
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
          {/* <button onClick={getValue} className="load-btn">load table</button> */}
        </div>
      )
    }
  }
}

class Grid extends Component {  
  render() {
    const { content } = this.props;
    if (content.length === 0) {
      return (<td className="course-table-grid"></td>)
    } else {
      return(
        <td className="course-table-grid">
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

Table.propTypes = {
  value: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);

