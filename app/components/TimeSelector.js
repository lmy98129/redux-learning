import React, { Component, Fragment } from 'react'
import { SegmentedControl, WhiteSpace } from 'antd-mobile'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules/index'
import { connect } from 'react-redux'
import Grid from './TimeSelGrid'
import './TimeSelector.css'

const filterMode = ['odd', 'even', 'all'];

class TimeSelector extends Component {
  render() {
    const { filterTimeSel, filterType, timeSelValue, timeSel, editingTimeSel } = this.props;
    let currentTimeSel;
    switch(timeSelValue) {
      case "Edit":
      case "Init":
      case "Empty":
      case "Filtered":
        currentTimeSel = JSON.parse(JSON.stringify(editingTimeSel))
        break;
      case "Save":
      case "Cancel":
        currentTimeSel = JSON.parse(JSON.stringify(timeSel))
        break;
      default:
        currentTimeSel = JSON.parse(JSON.stringify(timeSel))
        break;
    }
    return (
      <div className="time-selector-wrapper">
        <table className="time-selector">
          <tbody>
            {
              currentTimeSel.map((row, rowIndex) => {
                return (
                  <tr key={'tr_' + rowIndex} >
                    {  
                      row.map((itemValue, colIndex) => {
                        return <Grid key={'td_' + colIndex} row={rowIndex} col={colIndex} selected={(itemValue==2)} itemValue={itemValue}/>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <WhiteSpace size="lg"/>
        <SegmentedControl 
          selectedIndex={filterType}
          values={['单周', '双周', '全选']} 
          style={{ height: "30px" }}
          onChange={(e) => {
            let index = e.nativeEvent.selectedSegmentIndex;
            filterTimeSel(filterMode[index], timeSel);
          }}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelector);