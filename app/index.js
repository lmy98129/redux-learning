import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Table extends Component {
  render() {
    const { value, onGetButtonClick } = this.props;
    return (
      <div>
        <span>
          {value}
        </span>
        <button onClick={onGetButtonClick}>GetValue</button>
      </div>
    )
  }
}

Table.propTypes = {
  value: PropTypes.string.isRequired
}

// Action
const getValue = {type: 'getValue'}

// Reducer
function valueReducer(state = { value: "" }, action) {
  const value = state.value
  switch (action.type) {
    case 'getValue':
      return { value: value + "Good " }
    default:
      return state
  }
}

// Store
const store = createStore(valueReducer);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.value
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onGetButtonClick: () => dispatch(getValue)
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)