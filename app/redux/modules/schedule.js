import qs from 'querystring'

export const actionTypes = {
  GET_VALUE_LOADING: 'SCHEDULE/GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'SCHEDULE/GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'SCHEDULE/GET_VALUE_FAILED',
  ADD_COURSE: 'SCHEDULE/ADD_COURSE',
  EDIT_COURSE: 'SCHEDULE/EDIT_COURSE'
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
        payload: action.payload
      }
    case 'SCHEDULE/GET_VALUE_FAILED':
      return {
        value: "Failed"
      }
    case 'SCHEDULE/ADD_COURSE':
      return {
        value: "Added",
        payload: action.payload
      }
    case 'SCHEDULE/EDIT_COURSE':
      return {
        value: "Edited",
        payload: action.payload
      }
    default:
      return state
  }
}

export const mapStateToProps = (state) => {
  let props = {
    value: state.schedule.value,
  }
  switch(state.schedule.value) {
    case "Success":
    case "Added":
    case "Edited":
      props.payload = state.schedule.payload
      break;
    default:
      props.payload = {} 
      break;
  }
  return props;
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getValue: () => {
      scheduleGetter(
        // '/login',
        host + '/login', 
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
        },
        dispatch
      )
    },
    addCourse: (content, newCourse) => scheduleAdder(content, newCourse, dispatch)
  }
}

const defaultColor = ["#f05261", "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#52db9a", "#3f51b5", "#f3d147", "#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"];

const scheduleGetter = (url, init, dispatch) => {
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
      let schedule = res.data.body.map;
      let colorMap = {}, counter = 0;
      for (let time=1; time<=6; time++) {
        for (let date=1; date<=7; date++) {
          for (let index=0; index<schedule[String(time)][String(date)].length; index++) {
            let item = schedule[String(time)][String(date)][index],
              name = item.courseName;
            if (!colorMap[name]) {
              colorMap[name] = defaultColor[counter];
              schedule[String(time)][String(date)][index].color = defaultColor[counter];
              counter++;
            } else {
              schedule[String(time)][String(date)][index].color = colorMap[name];
            }
          }
        }
      }
      console.log(schedule);
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        payload: schedule
      })
    })
    .catch(err => {
      dispatch({type: actionTypes.GET_VALUE_FAILED})
    })
  })
}

const scheduleAdder = (content, newCourse, dispatch) => {
  content[String(newCourse.dayOfWeek)][String(newCourse.section)] = newCourse;
  dispatch({type: actionTypes.ADD_COURSE, payload: content});
}