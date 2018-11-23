import qs from 'querystring'

const actionTypes = {
  UNLOGIN: 'USER/UNLOGIN',
  LOGGED: 'USER/LOGGED',
  FAILED: 'USER/FAILED',
  SUCCESS: 'USER/SUCCESS',
  CHECKING: 'USER/CHECKING',
  INIT: 'USER/INIT',
}

const defaultState = { 
  userStatus: "Init",
  idNo: "",
  secrite: "",
  stuNo: ""
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
        userStatus: "checking"
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
    default:
      return state;
  }
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
    userInfo.loginApi = '/StuLoginService/loginStudentByIdentity.json';
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
  dispatch({ type: actionTypes.UNLOGIN });
}