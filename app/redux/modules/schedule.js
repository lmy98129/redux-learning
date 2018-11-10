import qs from 'querystring'

export const actionTypes = {
  GET_VALUE_LOADING: 'SCHEDULE/GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'SCHEDULE/GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'SCHEDULE/GET_VALUE_FAILED',
}

export default (state = { value: "Loading" }, action) => {
  switch (action.type) {
    case 'SCHEDULE/GET_VALUE_LOADING':
      return {
        value: "Loading"
      }
    case 'SCHEDULE/GET_VALUE_SUCCESS':
      return {
        value: JSON.stringify(action.payload)
      }
    case 'SCHEDULE/GET_VALUE_FAILED':
      return {
        value: "Failed"
      }
    default:
      return state
  }
}

export const mapStateToProps = (state) => {
  return {
    value: state.schedule.value
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getValue: () => {
      scheduleGetter(
        '/login', 
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
        },
        dispatch
      )
    }
  }
}

export const scheduleGetter = (url, init, dispatch) => {
  dispatch({ type: actionTypes.GET_VALUE_LOADING });
  return new Promise(() => {
    return fetch(url, {
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
  })
}