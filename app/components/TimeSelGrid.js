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
          (parseInt(row)-1)*4 + parseInt(col)
        }
      </td>
    )
  }
}

export default TimeSelectorGrid;