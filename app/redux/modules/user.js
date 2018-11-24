import qs from 'querystring'

const actionTypes = {
  INIT: 'USER/INIT',
  UNLOGIN: 'USER/UNLOGIN',
  LOGGED: 'USER/LOGGED',
  FAILED: 'USER/FAILED',
  SUCCESS: 'USER/SUCCESS',
  CHECKING: 'USER/CHECKING',
  GET_PROFILE_INIT: 'USER/GET_PROFILE_INIT',
  GET_PROFILE_SUCCESS: 'USER/GET_PROFILE_SUCCESS',
  GET_PROFILE_LOADING: 'USER/GET_PROFILE_LOADING',
  GET_PROFILE_FAILED: 'USER/GET_PROFILE_FAILED',
}

const defaultState = { 
  userStatus: "Init",
  userProfileStatus: "Init",
  idNo: "",
  secrite: "",
  stuNo: "",
  userProfile: {}
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case "USER/INIT":
      return {
        ...defaultState
      }
    case 'USER/CHECKING':
      return {
        ...state,
        userStatus: "Checking"
      }
    case 'USER/UNLOGIN':
      return {
        ...state,
        userStatus: "Unlogin"
      }
    case 'USER/LOGGED':
      return {
        ...state,
        userStatus: "Logged"
      }
    case 'USER/SUCCESS':
      let { type, ...userInfo } = action;
      return {
        ...state,
        userStatus: "Success",
        ...userInfo
      }
    case 'USER/FAILED':
      return {
        ...state,
        userStatus: "Failed"
      }
    case 'USER/GET_PROFILE_INIT':
      return {
        ...state,
        userProfileStatus: "Init",
        userProfile: {}
      }
    case 'USER/GET_PROFILE_SUCCESS':
      let { userProfile } = action;
      return {
        ...state,
        userProfileStatus: "Success",
        userProfile,
      }
    case 'USER/GET_PROFILE_FAILED':
      return {
        ...state,
        userProfileStatus: "Failed",
      }
    case 'USER/GET_PROFILE_LOADING':
      return {
        ...state,
        userProfileStatus: "Loading",
      }
    default:
      return state;
  }
}

const initLogin = async (userInfo) => {
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
  await fetch(host + '/login', { method: 'GET' })
  init.headers.csrftoken = qs.parse(document.cookie).csrfToken;
  return init;
}

export const checkLogin = async (dispatch) => {
  let userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    try {
      commitLogin(JSON.parse(userInfo), dispatch);
    } catch (error) {
      return dispatch({ type: actionTypes.FAILED });
    }
  } else {
    return dispatch({ type: actionTypes.UNLOGIN });
  }
}

export const commitLogin = async (userInfo, dispatch) => {
  dispatch({ type: actionTypes.CHECKING })
  try {
    let init = await initLogin(userInfo);
    let resp = await fetch(host + '/login', init);
    resp = await resp.json();
    switch(resp.data.code) {
      case "STUDENT_NO_INVALID":
        dispatch({ type: actionTypes.FAILED });
        dispatch({ type: actionTypes.UNLOGIN });
        break;
      case "SUCCESS":
        delete userInfo.loginApi;
        dispatch({ type: actionTypes.SUCCESS, ...userInfo })
        dispatch({ type: actionTypes.LOGGED });
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        break;
      default:
        dispatch({ type: actionTypes.FAILED });
        dispatch({ type: actionTypes.UNLOGIN });
        break;
    }
  } catch (error) {
    dispatch({ type: actionTypes.FAILED });
    dispatch({ type: actionTypes.UNLOGIN });
  }  
}

export const quitLogin = (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('userProfile');
  // localStorage.removeItem('courseTable');
  dispatch({ type: actionTypes.UNLOGIN });
}

export const getUserProfile = async (dispatch) => {
  dispatch({ type: actionTypes.GET_PROFILE_LOADING });
  let userProfile = localStorage.getItem('userProfile');
  if (userProfile) {
    userProfile = JSON.parse(userProfile);
    dispatch({ type: actionTypes.GET_PROFILE_SUCCESS, userProfile })
  } else {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        let init = await initLogin(JSON.parse(userInfo));
        let resp = await fetch(host + '/profile', init);
        resp = await resp.json();
        switch(resp.data.code) {
          case "SUCCESS":
            userProfile = resp.data.body;
            localStorage.setItem('userProfile', JSON.stringify(resp.data.body));
            dispatch({ type: actionTypes.GET_PROFILE_SUCCESS, userProfile })
            break;
          default:
            dispatch({ type: actionTypes.GET_PROFILE_FAILED });
            break;
        }
      } catch (error) {
        dispatch({ type: actionTypes.GET_PROFILE_FAILED });
      }
    } else {
      dispatch({ type: actionTypes.GET_PROFILE_FAILED });
    }
  }
}