import React, { Component } from 'react'
import { mapDispatchToProps, mapStateToProps } from '../redux/modules'
import { connect } from 'react-redux';
import './TimeSelGrid.css'

class TimeSelectorGrid extends Component {
  render() {
    const { col, row, selected, editTimeSel, timeSel, itemValue } = this.props;
    return (
      <td 
        className={
          "time-selector-grid"+(selected ? " selected" : "")
        }
        onClick={() => {
          let status = (itemValue==2) ? 0 : 2;
          editTimeSel(row, col, timeSel, status);
        }}
      >
        {
          (row)*4 + (col+1)
        }
      </td>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelectorGrid);