import { combineReducers } from 'redux';
import qs from 'querystring';
import scheduleReducer, {
   scheduleAdder, 
   scheduleDelete, 
   scheduleUpdate, 
   scheduleGetter,
  } from './schedule';
import routerReducer, {
    forwardPush,
    backwardPop,
  } from './router';

export default combineReducers({
  scheduleReducer,
  routerReducer
})

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
    forwardPush: (history, current) => forwardPush(history, current, dispatch),
    backwardPop: (history) => backwardPop(history),
    // returnToSuccess: (schedule) => dispatch({ type:actionTypes.GET_VALUE_SUCCESS, schedule}),
  }
}

export const mapStateToProps = (state) => {
  let props = {
    ...state.scheduleReducer,
    ...state.routerReducer
  }
  if (state.scheduleReducer.schedule !== {} &&
    state.scheduleReducer.schedule !== undefined) {
      props.schedule = state.scheduleReducer.schedule;
    }
  return props;
}