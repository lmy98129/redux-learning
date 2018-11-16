import { combineReducers } from 'redux';
import qs from 'querystring';
import courseTableReducer, {
   courseTableAdder, 
   courseTableDelete, 
   courseTableUpdate, 
   courseTableGetter,
  } from './courseTable';
import routerReducer, {
    forwardPush,
    backwardPop,
  } from './router';

export default combineReducers({
  courseTableReducer,
  routerReducer
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
    forwardPush: (history, current) => forwardPush(history, current, dispatch),
    backwardPop: (history) => backwardPop(history, dispatch),
    // returnToSuccess: (courseTable) => dispatch({ type:actionTypes.GET_VALUE_SUCCESS, courseTable}),
  }
}

export const mapStateToProps = (state) => {
  let props = {
    ...state.courseTableReducer,
    ...state.routerReducer
  }
  if (state.courseTableReducer.courseTable !== {} &&
    state.courseTableReducer.courseTable !== undefined) {
      props.courseTable = state.courseTableReducer.courseTable;
    }
  return props;
}