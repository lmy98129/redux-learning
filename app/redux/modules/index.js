import { combineReducers } from 'redux';
import qs from 'querystring';
import courseTableReducer, {
   courseTableAdder, 
   courseTableDelete, 
   courseTableUpdate, 
   courseTableGetter,
   forceToUpdate,
   changeWeek,
   showAllCourse,
  } from './courseTable';
import routerReducer, {
    forwardPush,
    backwardPop,
  } from './router';
import timeSelReducer, {
    initTimeSel,
    editTimeSel,
    filterTimeSel,
    emptyTimeSel,
    saveTimeSel,
    cancelTimeSel,
  } from './timeSelect'
import userReducer, {
    checkLogin,
    commitLogin,
    quitLogin
  } from './user'

export default combineReducers({
  courseTableReducer,
  routerReducer,
  timeSelReducer,
  userReducer
})

export const mapStateToProps = (state) => {
  return {
    ...state.courseTableReducer,
    ...state.routerReducer,
    ...state.timeSelReducer,
    ...state.userReducer,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    getSchedule: (userInfo, isRefresh) => courseTableGetter(userInfo, isRefresh, dispatch),
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
    showAllCourse: (showAll) => showAllCourse(showAll, dispatch),
    saveTimeSel: (editingWeek) => saveTimeSel(editingWeek, dispatch),
    cancelTimeSel: () => cancelTimeSel(dispatch),
    checkLogin: () => checkLogin(dispatch),
    commitLogin: (userInfo) => commitLogin(userInfo, dispatch),
    quitLogin: () => quitLogin(dispatch),
  }
}
