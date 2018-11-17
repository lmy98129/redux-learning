import React, { Component, Fragment } from 'react'
import './TimeSelGrid.css'

class TimeSelectorGrid extends Component {
  render() {
    const { col, row, selected } = this.props;
    return (
      <td className={
        "time-selector-grid"+(selected ? " selected" : "")
      }>
        {
          (row)*4 + (col+1)
        }
      </td>
    )
  }
}

export default TimeSelectorGrid;