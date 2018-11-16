import React, { Component, Fragment } from 'react'
import { SegmentedControl, WhiteSpace } from 'antd-mobile'
import Grid from './TimeSelGrid'
import './TimeSelector.css'

const staticArray = [1, 2, 3, 4];

class TimeSelector extends Component {
  render() {
    return (
      <div className="time-selector-wrapper">
        <table className="time-selector">
          <tbody>
            {
              staticArray.map((row, rowIndex) => {
                return (
                  <tr key={'tr_' + row} >
                    {  
                      staticArray.map((col, colIndex) => {
                        return <Grid key={'td_' + col} row={row} col={col} selected={true}/>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <WhiteSpace size="lg"/>
        <SegmentedControl selectedIndex={4} values={['单周', '双周', '全选']} style={{ height: "30px" }}/>
      </div>
    )
  }
}

export default TimeSelector;