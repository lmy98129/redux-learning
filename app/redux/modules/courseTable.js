import qs from 'querystring'

const actionTypes = {
  GET_VALUE_LOADING: 'COURSETABLE/GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'COURSETABLE/GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'COURSETABLE/GET_VALUE_FAILED',
  ADD_COURSE: 'COURSETABLE/ADD_COURSE',
  EDIT_COURSE: 'COURSETABLE/EDIT_COURSE'
}

export default (state = { tableValue: "Loading", courseTable: {} }, action) => {
  switch (action.type) {
    case 'COURSETABLE/GET_VALUE_LOADING':
      return {
        ...state,
        tableValue: "Loading"
      }
    case 'COURSETABLE/GET_VALUE_SUCCESS':
      return {
        ...state,
        tableValue: "Success",
        courseTable: action.courseTable
      }
    case 'COURSETABLE/GET_VALUE_FAILED':
      return {
        ...state,
        tableValue: "Failed"
      }
    case 'COURSETABLE/EDIT_COURSE':
      return {
        ...state,
        tableValue: "Edited",
        courseTable: action.courseTable
      }
    default:
      return state
  }
}

const defaultColor = ["#f05261", "#48a8e4", "#ffd061", "#52db9a", "#70d3e6", "#3f51b5", "#f3d147", "#4adbc3", "#673ab7", "#f3db49", "#76bfcd", "#b495e1", "#ff9800", "#8bc34a"];

const setColor = (courseTable) => {
  let colorMap = {}, counter = 0;
  for (let time=1; time<=6; time++) {
    for (let date=1; date<=7; date++) {
      for (let index=0; index<courseTable[String(time)][String(date)].length; index++) {
        let item = courseTable[String(time)][String(date)][index],
          name = item.courseName;
        if (!colorMap[name]) {
          colorMap[name] = defaultColor[counter];
          courseTable[String(time)][String(date)][index].color = defaultColor[counter];
          counter++;
          if (counter >= defaultColor.length) {
            counter = 0;
          }
        } else {
          courseTable[String(time)][String(date)][index].color = colorMap[name];
        }
      }
    }
  }
}

export const courseTableGetter = (url, init, isRefresh, dispatch) => {
  dispatch({ type: actionTypes.GET_VALUE_LOADING });
  let courseTable = localStorage.getItem('courseTable');
  if (courseTable && !isRefresh) {
    return dispatch({
      type: actionTypes.GET_VALUE_SUCCESS,
      courseTable: JSON.parse(courseTable)
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
      courseTable = res.data.body.map;
      setColor(courseTable);
      console.log(courseTable);
      localStorage.setItem('courseTable', JSON.stringify(courseTable));
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        courseTable
      })
    })
    .catch(err => {
      dispatch({type: actionTypes.GET_VALUE_FAILED})
    })
  })
}

export const courseTableAdder = (courseTable, time, date, newCourse, dispatch) => {
  courseTable[time][date].push(newCourse);
  setColor(courseTable);
  console.log(courseTable);
  localStorage.setItem('courseTable', JSON.stringify(courseTable));
  return dispatch({ type: actionTypes.EDIT_COURSE, courseTable })
}

export const courseTableDelete = (courseTable, time, date, index, dispatch) => {
  courseTable[time][date].splice(index, 1);
  setColor(courseTable);
  console.log(courseTable);
  localStorage.setItem('courseTable', JSON.stringify(courseTable));
  return dispatch({ type: actionTypes.EDIT_COURSE, courseTable })
}

export const courseTableUpdate = (courseTable, time, date, index, newValue, dispatch) => {
  Object.assign(courseTable[time][date][index], newValue);
  setColor(courseTable);
  console.log(courseTable);
  localStorage.setItem('courseTable', JSON.stringify(courseTable));
  return dispatch({ type: actionTypes.EDIT_COURSE, courseTable })
}