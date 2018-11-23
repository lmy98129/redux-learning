import qs from 'querystring'

const actionTypes = {
  GET_VALUE_LOADING: 'COURSETABLE/GET_VALUE_LOADING',
  GET_VALUE_SUCCESS: 'COURSETABLE/GET_VALUE_SUCCESS',
  GET_VALUE_FAILED: 'COURSETABLE/GET_VALUE_FAILED',
  ADD_COURSE: 'COURSETABLE/ADD_COURSE',
  EDIT_COURSE: 'COURSETABLE/EDIT_COURSE',
  CHANGE_WEEK: 'COURSETABLE/CHANGE_WEEK',
  UPDATE: 'COURSETABLE/UPDATE',
  SHOW_COURSE: 'COURSETABLE/SHOW_COURSE',
}

export default (state = { tableValue: "Loading", courseTable: {}, showAll: false }, action) => {
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
        courseTable: action.courseTable,
        curSchoolDate: action.curSchoolDate,
        schoolWeek: action.schoolWeek,
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
    case 'COURSETABLE/UPDATE':
      return {
        ...state,
        tableValue: "Success"
      }
    case 'COURSETABLE/CHANGE_WEEK':
      return {
        ...state,
        tableValue: "Change Week",
        schoolWeek: action.week,
      }
    case 'COURSETABLE/SHOW_COURSE':
      return {
        ...state,
        tableValue: "Success",
        showAll: action.showAll
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

export const courseTableGetter = async (userInfo, isRefresh, dispatch) => {
  dispatch({ type: actionTypes.GET_VALUE_LOADING });
  let curSchoolDate, schoolWeek;
  let init = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "csrftoken": ""
    },
    body: qs.stringify({
      ...userInfo,
      loginApi: '/StuLoginService/loginStudentByIdentity.json'
    }),
    credentials: 'include',
  };
  try {
    await fetch(host + '/login', { method: 'GET' })
    init.headers.csrftoken = qs.parse(document.cookie).csrfToken;
    let resp = await fetch(host +'/today', init)
    resp = await resp.json();
    curSchoolDate = resp.data.body.curSchoolDate;
    schoolWeek = curSchoolDate.schoolWeek;
  } catch (error) {
    dispatch({type: actionTypes.GET_VALUE_FAILED})
    return;
  }
  
  let courseTable = localStorage.getItem('courseTable');
  if (courseTable && !isRefresh) {
    return dispatch({
      type: actionTypes.GET_VALUE_SUCCESS,
      courseTable: JSON.parse(courseTable),
      curSchoolDate,
      schoolWeek
    })
  } else {
    try {
      await fetch(host + '/login', { method: 'GET' })
      init.headers.csrftoken = qs.parse(document.cookie).csrfToken;
      let resp = await fetch(host + '/table', init);
      resp = await resp.json();
      courseTable = resp.data.body.map;
      setColor(courseTable);
      console.log(courseTable);
      localStorage.setItem('courseTable', JSON.stringify(courseTable));
      dispatch({
        type: actionTypes.GET_VALUE_SUCCESS,
        courseTable,
        curSchoolDate,
        schoolWeek
      })
    } catch (error) {
      dispatch({type: actionTypes.GET_VALUE_FAILED})
      return;
    }
  }
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

export const forceToUpdate = (dispatch) => {
  dispatch({ type: actionTypes.UPDATE });
}

export const changeWeek = (week, dispatch) => {
  dispatch({ type: actionTypes.CHANGE_WEEK, week })
}

export const showAllCourse = (showAll, dispatch) => {
  dispatch({ type: actionTypes.SHOW_COURSE, showAll })
}