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
        value: "Success",
        payload: JSON.stringify(action.payload)
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
  let props = {
    value: state.schedule.value,
    payload: ""
  }
  if (state.schedule.value === "Success") {
    props.payload = JSON.parse(state.schedule.payload)
  }
  return props;
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
      let schedule = res.data.body.map;
      // let decodeSchedule = {};
      // for(let time=1; time<=6; time++) {
      //   decodeSchedule[String(time)] = {};
      //   for (let date=1; date<=7; date++) {
      //     if (!schedule[String(date)]) {
      //       decodeSchedule[String(time)][String(date)] = [];
      //     } else {
      //       decodeSchedule[String(time)][String(date)] = schedule[String(date)][String(time)];
      //     }
      //   }
      // }
      // console.log(decodeSchedule)
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        payload: schedule
      })
    })
    .catch(err => {
      console.log(err);
      dispatch({type: actionTypes.GET_VALUE_FAILED})
    })
  })
}