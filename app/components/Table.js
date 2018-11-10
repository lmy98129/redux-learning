import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps, mapStateToProps, scheduleGetter } from '../redux/modules/schedule'
import {  } from 'redux'

class Table extends Component {
  componentDidMount() {
    const { getValue } = this.props;
    getValue();
  }
  render() {
    const { value, getValue } = this.props;
    return (
      <div>
        <button onClick={getValue}>load value</button>
        <span>
          {value}
        </span>
      </div>
    )
  }
}

Table.propTypes = {
  value: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Table);

