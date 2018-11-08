import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

// React component
class Table extends Component {
  render() {
    const { value, onGetButtonClickAsync } = this.props;
    return (
      <div>
        <span>
          {value}
        </span>
        <button onClick={onGetButtonClickAsync}>GetValue</button>
      </div>
    )
  }
}

Table.propTypes = {
  value: PropTypes.string.isRequired
}

// Action
const actionTypes = {
  GET_VALUE: 'GET_VALUE',
  GET_VALUE_LOADING: 'GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'GET_VALUE_FAILED',
}

// Reducer
function valueReducer(state = { value: "" }, action) {
  const value = state.value
  switch (action.type) {
    case 'GET_VALUE':
      return { value: value + "Good " }
    case 'GET_VALUE_LOADING':
      return {
        value: "Loading"
      }
    case 'GET_VALUE_SUCCESS':
      return {
        value: ""
      }
    case 'GET_VALUE_FAILED':
      return {
        value: "Failed"
      }
    default:
      return state
  }
}

// Store
const store = createStore(
  valueReducer,
  applyMiddleware(thunk)
);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.value
  }
}

const getValueAsync = (url, init) => {
  return (dispatch, getState) => {
    fetch(url, init)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({type: actionTypes.GET_VALUE_FAILED})
    })
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onGetButtonClick: () => dispatch(actionTypes.GET_VALUE),
    onGetButtonClickAsync: () => {
      dispatch(getValueAsync(
      //   'http://elearning.ustb.edu.cn/choose_courses/j_spring_security_check', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: 'j_username=41624140,undergraduate&j_password=lmylmylmy98129',
      //   // credentials: 'include',
      //   mode: "no-cors"
      // }
      'http://student.bkthink.com/smvc/StuLoginService/loginStudentByIdentity.json', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: "idNo=350721199801291815&loginApi=/StuLoginService/loginStudentByIdentity.json&secrite=291815&stuNo=41624140",
          credentials: 'include',
          mode: "no-cors"
        }
      ));
    }
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