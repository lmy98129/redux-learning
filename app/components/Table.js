import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps, scheduleGetter } from '../redux/modules/schedule'
import './Table.css'

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
          <div>
            <button onClick={getValue} className="load-btn">load value</button>
          </div>
          <span>{value}</span>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={getValue} className="load-btn">load value</button>
          <table>
            <tbody>
              {
                (value === "Success") ? 
                (Object.keys(payload).map((time) => {
                  return (
                    <tr key={'ul_'+ time} >
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
                ) : value
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
}

class Grid extends Component {  
  render() {
    const { content } = this.props;
    if (content.length === 0) {
      return (<td></td>)
    } else {
      return(
        <td>
          {content.map((value, index) => {
            return (
              <span key={'span_'+(index+1)}>
                {
                  content[0].courseName
                }<br/>
                {
                  content[0].SKZCZFC
                }
              </span>
            )
          })}
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

