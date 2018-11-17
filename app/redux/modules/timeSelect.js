const actionTypes = {
  INIT: "TIMESEL/INIT",
  EDIT: "TIMESEL/EDIT",
  EMPTY: "TIMESEL/EMPTY"
}

const defaultState = {
  timeSelValue: "Empty",
  timeSel: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case "TIMESEL/INIT": 
      return {
        ...state,
        timeSelValue: "Init",
        timeSel: action.timeSel,
      }
    case "TIMESEL/EDIT":
      return {
        ...state,
        timeSelValue: "Edit",
        timeSel: action.timeSel
      }
    case "TIMESEL/EMPTY":
      return defaultState;
    default: 
      return state;
  }
}

export const initTimeSel = (timeString, dispatch) => {
  let timeStrArr = [], timeSel = [];
  timeStrArr = timeString.split("");
  for (let i=0; i<4; i++) {
    timeSel.push([])
    for (let j=0; j<4; j++) {
      timeSel[i].push(parseInt(timeStrArr.shift()));
    }
  }
  return dispatch({type: actionTypes.INIT, timeSel});
}

export const editTimeSel = (row, col, timeSel, status, dispatch) => {
  timeSel[row][col] = status;
  dispatch({type: actionTypes.EDIT, timeSel});
}

const filter = (i, j, mode) => {
  switch(mode) {
    case 'odd': 
      return (i*4+(j+1) % 2 == 1);
    case 'even': 
      return (i*4+(j+1) % 2 == 0);
    case 'all':
      return true;
  }
}

export const filterTimeSel = (mode, timeSel, dispatch) => {
  for (let i=0; i<4; i++) {
    for (let j=0; j<4; j++) {
      if (filter(i, j, mode)) {
        timeSel[i][j] = 2;
      }
    }
  }
  return dispatch({type: actionTypes.EDIT, timeSel});
}

export const emptyTimeSel = (dispatch) => dispatch({type: actionTypes.EMPTY});