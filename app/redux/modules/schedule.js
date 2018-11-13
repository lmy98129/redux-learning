import qs from 'querystring'

export const actionTypes = {
  GET_VALUE_LOADING: 'SCHEDULE/GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'SCHEDULE/GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'SCHEDULE/GET_VALUE_FAILED',
  ADD_COURSE: 'SCHEDULE/ADD_COURSE',
  EDIT_COURSE: 'SCHEDULE/EDIT_COURSE'
}

export default (state = { value: "Loading", schedule: {} }, action) => {
  switch (action.type) {
    case 'SCHEDULE/GET_VALUE_LOADING':
      return {
        value: "Loading"
      }
    case 'SCHEDULE/GET_VALUE_SUCCESS':
      return {
        value: "Success",
        schedule: action.schedule
      }
    case 'SCHEDULE/GET_VALUE_FAILED':
      return {
        value: "Failed"
      }
    case 'SCHEDULE/EDIT_COURSE':
      return {
        value: "Edited",
        schedule: action.schedule
      }
    default:
      return state
  }
}

export const mapStateToProps = (state) => {
  let props = {
    value: state.scheduleReducer.value,
  }
  if (state.scheduleReducer.schedule !== {} &&
    state.scheduleReducer.schedule !== undefined) {
      props.schedule = state.scheduleReducer.schedule;
    }
  return props;
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getSchedule: (isRefresh) => {
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
          // mode: "cors"
        },
        isRefresh,
        dispatch
      )
    },
    addCourse: (schedule, time, date, newCourse) => scheduleAdder(schedule, time, date, newCourse, dispatch),
    deleteCourse: (schedule, time, date, index) => scheduleDelete(schedule, time, date, index, dispatch),
    updateCourse: (schedule, time, date, index, newValue) => scheduleUpdate(schedule, time, date, index, newValue, dispatch),
    returnToSuccess: (schedule) => dispatch({ type:actionTypes.GET_VALUE_SUCCESS, schedule}),
  }
}

const defaultColor = ["#f05261", "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#3f51b5", "#f3d147", "#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"];

const setColor = (schedule) => {
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
          if (counter >= defaultColor.length) {
            counter = 0;
          }
        } else {
          schedule[String(time)][String(date)][index].color = colorMap[name];
        }
      }
    }
  }
}

const scheduleGetter = (url, init, isRefresh, dispatch) => {
  dispatch({ type: actionTypes.GET_VALUE_LOADING });
  let schedule = localStorage.getItem('schedule');
  if (schedule && !isRefresh) {
    return dispatch({
      type: actionTypes.GET_VALUE_SUCCESS,
      schedule: JSON.parse(schedule)
    })
  } else
  return new Promise(() => {
    return fetch(url, {
      method: 'GET',
      // mode: "cors",
    })
    .then(() => {
      init.headers.csrftoken = qs.parse(document.cookie).csrfToken;
      return fetch(url, init);
    })
    .then(res => res.json())
    .then(res => {
      schedule = res.data.body.map;
      setColor(schedule);
      console.log(schedule);
      localStorage.setItem('schedule', JSON.stringify(schedule));
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        schedule: schedule
      })
    })
    .catch(err => {
      dispatch({type: actionTypes.GET_VALUE_FAILED})
    })
  })
}

const scheduleAdder = (schedule, time, date, newCourse, dispatch) => {
  // schedule[String(newCourse.section)][String(newCourse.dayOfWeek)] = newCourse;
  // let newCourse = {
  //   SKZCZFC: "10-12周",
  //   courseName: "测试课程",
  //   "classroom.roomNickname": "测试地点"
  // }
  schedule[time][date].push(newCourse);
  setColor(schedule);
  console.log(schedule);
  localStorage.setItem('schedule', JSON.stringify(schedule));
  return dispatch({ type: actionTypes.EDIT_COURSE, schedule })
}

const scheduleDelete = (schedule, time, date, index, dispatch) => {
  schedule[time][date].splice(index, 1);
  setColor(schedule);
  console.log(schedule);
  localStorage.setItem('schedule', JSON.stringify(schedule));
  return dispatch({ type: actionTypes.EDIT_COURSE, schedule })
}

const scheduleUpdate = (schedule, time, date, index, newValue, dispatch) => {
  Object.assign(schedule[time][date][index], newValue);
  setColor(schedule);
  console.log(schedule);
  localStorage.setItem('schedule', JSON.stringify(schedule));
  return dispatch({ type: actionTypes.EDIT_COURSE, schedule })
}