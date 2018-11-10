import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import qs from 'querystring'

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
        value: JSON.stringify(action.payload)
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
    fetch(url, {
      method: 'GET',
      mode: "cors",
    })
    .then(() => {
      init.headers.csrftoken = qs.parse(document.cookie).csrfToken;
      return fetch(url, init);
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        payload: res.data.body.map
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
      '/login', 
      // 'http://localhost:7001/login',
      {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "csrftoken": ""
          },
          body: qs.stringify({
            idNo: '350721199801291815',
            loginApi: '/StuLoginService/loginStudentByIdentity.json',
            secrite: '291815',
            stuNo: '41624140',
          }),
          credentials: 'include',
          mode: "cors"
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