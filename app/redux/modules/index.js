import { combineReducers } from 'redux';
import qs from 'querystring';
import courseTableReducer, {
   courseTableAdder, 
   courseTableDelete, 
   courseTableUpdate, 
   courseTableGetter,
   forceToUpdate,
   changeWeek,
   showAllCourse
  } from './courseTable';
import routerReducer, {
    forwardPush,
    backwardPop,
  } from './router';
import timeSelReducer, {
    initTimeSel,
    editTimeSel,
    filterTimeSel,
    emptyTimeSel
  } from './timeSelect'

export default combineReducers({
  courseTableReducer,
  routerReducer,
  timeSelReducer
})

export const mapDispatchToProps = (dispatch) => {
  return {
    getSchedule: (isRefresh) => {
      courseTableGetter(
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
    addCourse: (courseTable, time, date, newCourse) => courseTableAdder(courseTable, time, date, newCourse, dispatch),
    deleteCourse: (courseTable, time, date, index) => courseTableDelete(courseTable, time, date, index, dispatch),
    updateCourse: (courseTable, time, date, index, newValue) => courseTableUpdate(courseTable, time, date, index, newValue, dispatch),
    forceToUpdate: () => forceToUpdate(dispatch),
    forwardPush: (history, current) => forwardPush(history, current, dispatch),
    backwardPop: (history) => backwardPop(history, dispatch),
    initTimeSel: (timeString) => initTimeSel(timeString, dispatch),
    editTimeSel: (row, col, timeSel, status) => editTimeSel(row, col, timeSel, status, dispatch),
    filterTimeSel: (mode, timeSel) => filterTimeSel(mode, timeSel, dispatch),
    emptyTimeSel: () => emptyTimeSel(dispatch),
    changeWeek: (week) => changeWeek(week, dispatch),
    showAllCourse: (showAll) => showAllCourse(showAll, dispatch)
  }
}

export const mapStateToProps = (state) => {
  let props = {
    ...state.courseTableReducer,
    ...state.routerReducer,
    ...state.timeSelReducer
  }
  // if (state.courseTableReducer.courseTable !== {} &&
  //   state.courseTableReducer.courseTable !== undefined) {
  //     props.courseTable = state.courseTableReducer.courseTable;
  //   }
  return props;
}